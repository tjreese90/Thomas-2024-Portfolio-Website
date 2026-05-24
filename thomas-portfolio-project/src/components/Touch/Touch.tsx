import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import './touch.scss';

const workExperience = [
	{
		company: 'Envoy',
		role: 'Full-Stack Software Engineer, Visitor Management',
		duration: 'Nov 2024 - Present',
		icon: 'fas fa-rocket',
		techStack:
			'Rails, Ember.js, React 19, TypeScript, AWS Bedrock, Model Context Protocol, Pulumi, Cerbos',
		description:
			"Built Codebase Intelligence: a RAG platform indexing 22 repos (~87,500 AST-aware code chunks, tree-sitter parsed) on Amazon S3 Vectors and Bedrock Knowledge Bases (Titan Text Embeddings V2), with a Python MCP server exposing six retrieval tools to Anthropic Claude — Hit@1 = 0.785 on a 200-query human-labeled eval set at ~$0.03/month. Migrated the visitor-management dashboard from Ember/Glimmer to React 19 via Module Federation 2.0. Designed AgentLock — a phase-based guardrails and permission model for the 14 agentic AI tools embedded in the Visitors product.",
	},
	{
		company: 'Sprout Social',
		role: 'Front-End Engineer',
		duration: 'May 2022 - Apr 2024',
		icon: 'fas fa-code',
		techStack:
			'JavaScript, TypeScript, React, Redux, React Context, Axios, SCSS',
		description:
			"Migrated core front-end components from Flow to TypeScript. Built and maintained the Seeds shared React component library. Shipped a bulk sentiment reclassification UI (1,000 messages/batch) with Redux and virtualized lists, cutting analyst handle time ~30%. Built a Query Builder backed by OpenAI GPT keyword suggestions, and a faceted message-exploration tool (React Context, Redux, React Router) that lifted session engagement ~30%.",
	},
	{
		company: 'The Walt Disney Company',
		role: 'Software Engineering Intern',
		duration: 'May 2021 - Nov 2021',
		icon: 'fas fa-graduation-cap',
		techStack: 'React, Redux, CSS, JavaScript, Applitools',
		description:
			"Shipped React and responsive-CSS fixes across multiple ABC News station sites. Built ESPN's Banner-Maker (reusable React components with Redux state and team/player API integration), cutting editorial banner-creation time ~35%. Owned the React front-end for a Student Loan Refinance product, cutting form-validation errors ~60%. Drove WCAG accessibility work with Applitools, raising automated a11y coverage ~70%.",
	},
	{
		company: 'Credit Karma',
		role: 'Full-Stack Web Developer Intern',
		duration: 'Jan 2020 - Dec 2020',
		icon: 'fas fa-briefcase',
		techStack: 'React, Node.js, Ruby, Python, AWS',
		description:
			'Built internal full-stack tooling across React, Node.js, Ruby, and Python services on AWS, focused on infrastructure automation and front-end developer experience. Partnered with platform engineers on shared library and CI pipeline improvements.',
	},
];

const personalProjects = [
	{
		name: 'TraderDan — Automated Trading System',
		description:
			"A production trading system managing real capital across five active prop-firm accounts. Built around TradeLocker integration, a FastAPI webhook execution server with prop-firm risk gates, a 14-agent AI team led by an OpenClaw CEO orchestrator (Anthropic Claude tool use), an eval harness with drift detection, semantic memory in ChromaDB, and a Next.js 15 dashboard for live monitoring.",
		link: 'https://github.com/tjreese90',
	},
	{
		name: 'Workout Tracker — React Native',
		description:
			'A React Native fitness tracker with user authentication, activity logging, and data visualization. Designed for quick daily check-ins and trend review.',
		link: 'https://github.com/tjreese90/Workout-Tracker-Native-App',
	},
];

const goals = [
	'Ship production AI systems with clear cost, latency, and quality budgets.',
	'Contribute to open-source MCP servers and developer tooling.',
	'Keep learning across the stack — from infra to model evaluation.',
];

const Touch = () => {
	return (
		<section className='my-journey' id='experience'>
			<span className='sectiontag'>&lt;section&gt;</span>
			<div className='my-journey__content'>
				<h2 className='my-journey__headingPrimary'>
					<span className='my-journey__sectionNumber'>02.</span> Experience
				</h2>
				<VerticalTimeline>
					{workExperience.map((job) => (
						<VerticalTimelineElement
							key={job.company}
							date={job.duration}
							iconStyle={{ background: 'var(--secondary)', color: 'var(--primary)' }}
							icon={<i className={job.icon} aria-hidden='true'></i>}
						>
							<motion.article
								className='vertical-timeline-element-content'
								initial={{ opacity: 0, y: 12 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4 }}
							>
								<h3 className='vertical-timeline-element-title'>
									{job.company}
								</h3>
								<p className='vertical-timeline-element-subtitle'>{job.role}</p>
								<p className='vertical-timeline-element-stack'>
									<span className='vertical-timeline-element-stackLabel'>
										Stack:
									</span>{' '}
									{job.techStack}
								</p>
								<p className='vertical-timeline-element-description'>
									{job.description}
								</p>
							</motion.article>
						</VerticalTimelineElement>
					))}
				</VerticalTimeline>
				<div className='banner'>
					<h3 className='goals-banner'>Goals & Aspirations</h3>
					<ul>
						{goals.map((goal) => (
							<li key={goal}>{goal}</li>
						))}
					</ul>
				</div>
				<h3 className='my-journey__subheading'>Personal Projects</h3>
				<div className='my-journey__projects'>
					{personalProjects.map((project, index) => (
						<motion.div
							key={project.name}
							className='my-journey__projects-item'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
						>
							<h4>
								<a
									href={project.link}
									target='_blank'
									rel='noopener noreferrer'
								>
									{project.name}
								</a>
							</h4>
							<p>{project.description}</p>
						</motion.div>
					))}
				</div>
				<p className='my-journey__contact'>
					I'm open to roles, contract work, or interesting collaborations.
					The inbox is always open — drop a note via the form.
				</p>
				<Link to='/contact' className='intro__button'>
					Get In Touch
				</Link>
			</div>
			<span className='sectiontag'>&lt;/section&gt;</span>
		</section>
	);
};

export default Touch;
