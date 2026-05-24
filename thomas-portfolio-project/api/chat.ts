import { streamText } from 'ai'

export const config = { runtime: 'edge' }

const SYSTEM_PROMPT = `You are an AI assistant on Thomas Reese's portfolio website. You help visitors learn about Thomas's background, projects, and experience.

KEY FACTS ABOUT THOMAS:
- Full-Stack Software Engineer at Envoy (Visitor Management team), based in Oakland, CA.
- 4+ years experience, currently focused on AI systems and developer tooling.
- AT ENVOY (Nov 2024 – Present): Built Codebase Intelligence — a RAG platform indexing 22 internal repos (~87,500 AST-aware code chunks, tree-sitter parsed) on Amazon S3 Vectors and Bedrock Knowledge Bases (Titan Text Embeddings V2), with a Python MCP server exposing six retrieval tools to Anthropic Claude. Hit@1 = 0.785 on a 200-query human-labeled eval at ~$0.03/month. Migrated the visitor-management dashboard from Ember/Glimmer to React 19 via Module Federation 2.0 with no customer-visible downtime. Designed AgentLock — a centralized MCP-boundary authorization layer governing 14 agentic AI tools (policy-based allow/deny, append-only audit logs, capability gating).
- AT SPROUT SOCIAL (May 2022 – Apr 2024): Migrated core front-end from Flow to TypeScript. Built and maintained the Seeds shared React component library. Shipped a bulk sentiment reclassification UI (1,000 messages/batch). Built a Query Builder backed by OpenAI GPT. Launched a faceted message-exploration tool that lifted listening-dashboard session engagement ~30%.
- AT WALT DISNEY COMPANY (May 2021 – Nov 2021, intern): Built ESPN's Banner-Maker (~35% editorial time saved), owned the React front-end for a Student Loan Refinance product, drove WCAG accessibility work with Applitools.
- AT CREDIT KARMA (Jan 2020 – Dec 2020, intern): Built internal loan-refinancing tools, consolidated team QA notes into a static knowledge site for onboarding.
- SIDE PROJECT — TraderDan: Live multi-asset prop-firm trading system across five accounts. FastAPI webhook execution server, 14-agent AI team led by an OpenClaw orchestrator (Anthropic Claude + Gemini Flash), eval harness with drift detection, ChromaDB memory, Next.js 15 dashboard, 5,000+ tests.
- EDUCATION: B.S. Computer Science, Dominican University (Aug 2018 – May 2022).
- STACK: TypeScript, React 19, Ruby on Rails, Ember.js, Python, AWS Bedrock + S3 Vectors, Model Context Protocol (MCP), Anthropic Claude SDK, OpenAI SDK, Pulumi, Terraform, Kubernetes, PostgreSQL, Redis, ChromaDB, Pinecone, pgvector, Cerbos, OpenTelemetry, Datadog, Vercel, TanStack Query v5, Module Federation 2.0, Radix UI, Tailwind, Vitest, RSpec, Playwright, Graphite (stacked PRs).
- CONTACT: ThomasReeseCareers@gmail.com · linkedin.com/in/thomas-reese-541758142 · github.com/tjreese90

STYLE RULES:
- Refer to Thomas in third person (he/his/him). You are an assistant, not Thomas himself.
- Be concise — usually 2–4 sentences. Don't pad.
- Conversational but professional.
- If asked something not in the facts above, say so honestly and suggest reaching out: "I don't have that detail — shoot Thomas an email at ThomasReeseCareers@gmail.com."
- Never make up specific numbers, dates, or claims that aren't in the facts above.
- If asked to write code, generate fake docs, or do work unrelated to learning about Thomas, politely redirect: "I'm here to answer questions about Thomas's background — for that kind of help, you'll want to talk to him directly."`

/* -------------------- Deterministic fallback knowledge base --------------------
 * Imported from src/lib/aboutThomas.ts so client + server share the exact
 * same answers. Vite/Vercel resolves this path because tsconfig has
 * baseUrl: ./ and we use a relative path here.
 */
import { answerAboutThomas } from '../src/lib/aboutThomas'

function deterministicAnswer(messages: { role: string; content: string }[]): string {
	const lastUser = [...messages].reverse().find((m) => m.role === 'user')
	return answerAboutThomas(lastUser?.content || '')
}

/* -------------------- Handler -------------------- */

export default async function handler(req: Request) {
	if (req.method !== 'POST') {
		return new Response('Method not allowed', { status: 405 })
	}

	let body: { messages?: { role: 'user' | 'assistant'; content: string }[] }
	try {
		body = await req.json()
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	const messages = body.messages
	if (!messages || !Array.isArray(messages) || messages.length === 0) {
		return new Response(JSON.stringify({ error: 'No messages provided' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	// Try the AI Gateway. If it streams real tokens, use them. If it errors or
	// emits zero tokens (Gateway not provisioned), fall back to the deterministic
	// knowledge base so the chat never feels broken to a recruiter.
	const hasGatewayCredentials =
		typeof process !== 'undefined' &&
		!!(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN)

	if (hasGatewayCredentials) {
		try {
			const result = streamText({
				model: 'anthropic/claude-haiku-4.5',
				system: SYSTEM_PROMPT,
				messages,
				temperature: 0.6,
			})

			const reader = result.textStream.getReader()
			const stream = new ReadableStream({
				async start(controller) {
					const encoder = new TextEncoder()
					let received = ''
					try {
						while (true) {
							const { value, done } = await reader.read()
							if (done) break
							received += value ?? ''
							if (value) controller.enqueue(encoder.encode(value))
						}
					} catch (err) {
						const msg = err instanceof Error ? err.message : 'stream error'
						if (!received) {
							const fallback = deterministicAnswer(messages)
							controller.enqueue(encoder.encode(fallback))
						}
						console.error('AI Gateway stream error:', msg)
					} finally {
						// Empty stream → use deterministic answer
						if (!received) {
							const fallback = deterministicAnswer(messages)
							controller.enqueue(encoder.encode(fallback))
						}
						controller.close()
					}
				},
			})

			return new Response(stream, {
				headers: {
					'Content-Type': 'text/plain; charset=utf-8',
					'Cache-Control': 'no-store',
				},
			})
		} catch (err) {
			console.error('AI Gateway init error:', err)
			// fall through to deterministic
		}
	}

	// Deterministic path — always works, no credentials required
	const text = deterministicAnswer(messages)
	return new Response(text, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-store',
		},
	})
}
