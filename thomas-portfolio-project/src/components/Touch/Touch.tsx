import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import AnimatedLettersFast from '../AnimatedLettersFast/AnimatedLettersFast';
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
	const [letterClass, setLetterClass] = useState('text-animate-fast');
	const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

	const handleCardClick = (index: number) => {
		setFlippedIndex(flippedIndex === index ? null : index);
	};

	const nameArray = [...'05. My Journey'];

	useEffect(() => {
		const timer = setTimeout(() => {
			setLetterClass('text-animate-fast-hover');
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section className='my-journey' id='my-journey'>
			<span className='sectiontag'>&lt;section&gt;</span>
			<div className='my-journey__content'>
				<h1 className='my-journey__headingPrimary'>
					<AnimatedLettersFast
						letterClass={letterClass}
						strArray={nameArray}
						idx={15}
					/>
				</h1>
				<div className='banner'>
					<h2 className='goals-banner'>Goals and Aspirations</h2>
					<ul>
						{goals.map((goal) => (
							<li key={goal}>{goal}</li>
						))}
					</ul>
				</div>
				<h2 className='my-journey__subheading'>Work Experience</h2>
				<p className='my-journey__hint'>
					Tap a card to flip and see the tech stack and details.
				</p>
				<VerticalTimeline>
					{workExperience.map((job, index) => (
						<VerticalTimelineElement
							key={job.company}
							date={job.duration}
							iconStyle={{ background: 'var(--primary)', color: '#fff' }}
							icon={<i className={job.icon} aria-hidden='true'></i>}
						>
							<motion.div
								className={`vertical-timeline-element-content ${
									flippedIndex === index ? 'flipped' : ''
								}`}
								role='button'
								tabIndex={0}
								aria-pressed={flippedIndex === index}
								aria-label={`${job.company} — ${job.role}. Activate to view tech stack and details.`}
								onClick={() => handleCardClick(index)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault()
										handleCardClick(index)
									}
								}}
							>
								<div className='vertical-timeline-element-front'>
									<h3 className='vertical-timeline-element-title'>
										{job.company}
									</h3>
									<h4 className='vertical-timeline-element-subtitle'>
										{job.role}
									</h4>
								</div>
								<div className='vertical-timeline-element-back'>
									<h4>Tech Stack: {job.techStack}</h4>
									<p>{job.description}</p>
								</div>
							</motion.div>
						</VerticalTimelineElement>
					))}
				</VerticalTimeline>
				<h2 className='my-journey__subheading'>Personal Projects</h2>
				<div className='my-journey__projects'>
					{personalProjects.map((project, index) => (
						<motion.div
							key={project.name}
							className='my-journey__projects-item'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
						>
							<h3>
								<a
									href={project.link}
									target='_blank'
									rel='noopener noreferrer'
								>
									{project.name}
								</a>
							</h3>
							<p>{project.description}</p>
						</motion.div>
					))}
				</div>
				<p className='my-journey__contact'>
					I'm currently on the lookout for exciting new opportunities—like a
					coder searching for that elusive semicolon. If you have a question, an
					interesting project, or just want to say hi, my inbox is always open!
					I'll try my best to respond faster than a recursive function on
					overdrive.
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
