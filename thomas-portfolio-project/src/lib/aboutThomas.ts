// Curated knowledge base about Thomas Reese.
// Used as a deterministic fallback when the AI Gateway is unavailable.
// Imported by both /api/chat (server) and Contact.tsx (client).

type Topic = { keywords: RegExp; answer: string };

export const TOPICS: Topic[] = [
	// Specific topics first — more specific keywords win
	{
		keywords: /\b(envoy|current job|current role|where (does|is) (he|thomas) work|day job)\b/i,
		answer:
			"At Envoy, Thomas built Codebase Intelligence — a RAG platform indexing 22 internal repos (~87,500 AST-aware code chunks) on Amazon S3 Vectors and Bedrock Knowledge Bases. He also led the migration of the Visitor Management dashboard from Ember/Glimmer to React 19 via Module Federation 2.0, and designed AgentLock — a centralized authorization layer that governs 14 agentic AI tools through policy-based allow/deny, audit logs, and capability gating.",
	},
	{
		keywords: /\b(codebase intelligence|rag|retrieval|mcp|model context protocol)\b/i,
		answer:
			"Codebase Intelligence is the RAG platform Thomas built end-to-end at Envoy. It indexes 22 internal repos (~87,500 AST-aware code chunks, tree-sitter parsed) on Amazon S3 Vectors and Bedrock Knowledge Bases with Titan Text Embeddings V2, exposed via a Python MCP server with six retrieval tools to Anthropic Claude. Hit@1 lands at 0.785 on a 200-query human-labeled eval at roughly $0.03/month in inference cost.",
	},
	{
		keywords: /\b(agentlock|guardrail|agent auth|policy|cerbos)\b/i,
		answer:
			"AgentLock is the centralized MCP-boundary authorization layer Thomas designed at Envoy. It governs 14 agentic AI tools through policy-based allow/deny, append-only audit logs, and capability gating — essentially a permission system for what an LLM agent is allowed to do across customer data.",
	},
	{
		keywords: /\b(traderdan|trading|prop firm|signal|backtest|opcalw|openclaw)\b/i,
		answer:
			"TraderDan is Thomas's side project — a live multi-asset prop-firm trading system running across five accounts. It uses a FastAPI webhook execution server, a 14-agent AI team led by an OpenClaw orchestrator (Anthropic Claude + Gemini Flash), an eval harness with drift detection, ChromaDB for memory, a Next.js 15 dashboard, and 5,000+ tests.",
	},
	{
		keywords: /\b(sprout|sprout social|prior job|previous job)\b/i,
		answer:
			"Before Envoy, Thomas spent ~2 years at Sprout Social (May 2022 – Apr 2024). He migrated the core front-end from Flow to TypeScript, maintained the Seeds shared React component library, built a bulk sentiment-reclassification UI (1,000 messages/batch), and launched a Query Builder backed by OpenAI GPT plus a faceted message-exploration tool that lifted listening-dashboard session engagement ~30%.",
	},
	{
		keywords: /\b(disney|espn|banner.?maker|student loan)\b/i,
		answer:
			"Thomas interned at The Walt Disney Company (May–Nov 2021). He built ESPN's Banner-Maker (cutting editorial time ~35%), owned the React front-end for a Student Loan Refinance product, and drove WCAG accessibility work using Applitools.",
	},
	{
		keywords: /\b(credit karma|qa notes|loan re.?financ)\b/i,
		answer:
			"Thomas interned at Credit Karma (Jan – Dec 2020), where he built internal loan-refinancing tools and consolidated the team's QA notes into a static knowledge site that streamlined onboarding for new engineers.",
	},
	{
		keywords: /\b(stack|tech|technolog|skills|languages|framework)\b/i,
		answer:
			"His strongest stack: TypeScript + React 19, Ruby on Rails, Ember.js, Python, and the AWS Bedrock + S3 Vectors + MCP ecosystem. Day-to-day he also uses Anthropic Claude SDK, OpenAI SDK, Pulumi/Terraform, Kubernetes, PostgreSQL, Redis, ChromaDB / pgvector / Pinecone, Cerbos, OpenTelemetry, Datadog, TanStack Query, Module Federation 2.0, Radix UI, Tailwind, Vitest, RSpec, Playwright, and Graphite for stacked PRs.",
	},
	{
		keywords: /\b(strongest|best at|specialty|favorite)\b/i,
		answer:
			"His sweet spot is building production AI systems end-to-end: vector-store infra, RAG retrieval pipelines, MCP servers, policy/guardrail layers, and the React/TypeScript frontends that surface them. The combination of full-stack engineering plus AI infrastructure (not just calling an API) is what he optimizes for.",
	},
	{
		keywords: /\b(reach|contact|email|hire|how (do i|to)|get in touch|message)\b/i,
		answer:
			"Email is best: ThomasReeseCareers@gmail.com. You can also reach him on LinkedIn (linkedin.com/in/thomas-reese-541758142) or check his GitHub at github.com/tjreese90. The contact form on this page goes straight to his inbox.",
	},
	{
		keywords: /\b(education|school|college|degree|university|dominican)\b/i,
		answer:
			"Thomas earned a B.S. in Computer Science from Dominican University (Aug 2018 – May 2022).",
	},
	{
		keywords: /\b(location|where (does|do) (he|thomas) live|based|oakland|bay area|california)\b/i,
		answer:
			"Thomas is based in Oakland, California (Bay Area). He works on Envoy's Visitor Management team — open to remote, hybrid, and on-site roles.",
	},
	{
		keywords: /\b(react|react 19|frontend|front.?end)\b/i,
		answer:
			"On the frontend Thomas works primarily in React 19 + TypeScript. At Envoy he led the migration of the Visitor Management dashboard from Ember/Glimmer to React 19 via Module Federation 2.0 with no customer-visible downtime. He's also fluent in TanStack Query, Radix UI, Tailwind, and the modern Vite/Next.js toolchain.",
	},
	{
		keywords: /\b(python|fastapi|backend|server)\b/i,
		answer:
			"On the backend Thomas works in Python (FastAPI for AI services), Ruby on Rails, and Node. The TraderDan trading system runs on FastAPI with webhook execution + prop-firm risk gates; the Envoy Codebase Intelligence MCP server is also Python.",
	},
	{
		keywords: /\b(ai|llm|claude|gpt|anthropic|openai)\b/i,
		answer:
			"Thomas works deeply with AI systems — Anthropic Claude SDK, OpenAI SDK, the Model Context Protocol, AWS Bedrock + S3 Vectors, vector stores (Pinecone / pgvector / ChromaDB), and policy/guardrail layers like AgentLock. His focus is production-grade AI infra, not just prompt engineering.",
	},
	{
		keywords: /\b(resume|cv|pdf)\b/i,
		answer:
			"His resume PDF is available right on this site — click the gold Resume button in the top navigation bar to view or download.",
	},
	{
		keywords: /\b(project|portfolio|github|side project)\b/i,
		answer:
			"Beyond his work at Envoy, his standout side project is TraderDan — a 14-agent AI trading system running real capital across five prop-firm accounts. He also has Blue Ridge Canine Academy (a full-stack scheduling/payments platform), an AI Form Builder (Gemini-powered React app), and a UFC Fight Prediction Generator. All four are featured on this site with links to GitHub or the live deployment.",
	},
	{
		keywords: /\b(open to work|hiring|opportunit|available|looking)\b/i,
		answer:
			"Yes — Thomas is open to new opportunities, especially senior+ roles where he can work on production AI systems, developer tooling, or AI-product UX. Reach out at ThomasReeseCareers@gmail.com.",
	},
	// Generic "who is Thomas / tell me about him" comes LAST so specific topics above win first
	{
		keywords: /\b(who|tell me about|introduce|about thomas|background)\b/i,
		answer:
			"Thomas Reese is a Full-Stack Software Engineer at Envoy (Visitor Management team), based in Oakland, California. He has 4+ years of experience and currently focuses on production AI systems and developer tooling — building things like Codebase Intelligence (a RAG platform serving 14 agentic AI tools) and TraderDan (a multi-account prop-firm trading system).",
	},
];

export function answerAboutThomas(question: string): string {
	const q = (question || '').toLowerCase().trim();
	if (!q) {
		return "I'm here to help you learn about Thomas Reese. Try asking about Envoy, his stack, TraderDan, or how to reach him.";
	}
	const hit = TOPICS.find((t) => t.keywords.test(q));
	if (hit) return hit.answer;
	return "I don't have that specific detail in my context — shoot Thomas an email at ThomasReeseCareers@gmail.com and he'll get back to you.";
}
