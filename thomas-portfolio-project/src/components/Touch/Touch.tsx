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
			"At Envoy I'm a full-stack engineer on the Visitor Management product, ranging between Python for AI infra, TypeScript + React 19 on the front-end, and Ruby on Rails on the back-end. Most of my time goes into the AI features the product is built around — I built Codebase Intelligence, the internal RAG system our engineers use to search the monorepo through Claude, and designed AgentLock, the authorization layer that governs the 14 agentic AI tools we ship to customers. I'm also leading the incremental migration of our dashboard from Ember/Glimmer to React 19, with feature work and customer fixes (Blue Origin, Tesla, NVIDIA among them) shipping in parallel.",
	},
	{
		company: 'Sprout Social',
		role: 'Front-End Engineer',
		duration: 'May 2022 - Apr 2024',
		icon: 'fas fa-code',
		techStack:
			'JavaScript, TypeScript, React, Redux, React Context, Axios, SCSS',
		description:
			"Two years on the social-listening team at Sprout. My focus was the analyst-facing dashboard — I owned the Flow → TypeScript migration for the core front-end and maintained the Seeds shared React component library that the whole engineering org consumes. I shipped two of the features analysts use daily: a bulk sentiment-reclassification UI that handles 1,000 messages at a time, and a faceted message-exploration tool that became central to listening workflows. I also built an early GPT-powered query builder back when LLM-assisted UX was just starting to be productized.",
	},
	{
		company: 'The Walt Disney Company',
		role: 'Software Engineering Intern',
		duration: 'May 2021 - Nov 2021',
		icon: 'fas fa-graduation-cap',
		techStack: 'React, Redux, CSS, JavaScript, Applitools',
		description:
			"Summer-into-fall internship embedded with ABC News and ESPN front-end teams. I shipped React and responsive-CSS fixes across multiple ABC News station sites and built ESPN's Banner-Maker — a reusable React + Redux tool that integrated team and player APIs to cut editorial banner-creation time substantially. On the consumer side I owned the React front-end for a Student Loan Refinance product, and worked with Applitools on the WCAG accessibility audit that gave me my first real exposure to a11y as an engineering discipline rather than a checklist.",
	},
	{
		company: 'Credit Karma',
		role: 'Full-Stack Web Developer Intern',
		duration: 'Jan 2020 - Dec 2020',
		icon: 'fas fa-briefcase',
		techStack: 'React, Node.js, Ruby, Python, AWS',
		description:
			"A full year at Credit Karma, split across two teams. I started on infrastructure — writing unit + regression test suites in Ruby and Jenkins and learning Kubernetes-based service deployment under platform engineers. Then I moved to product, shipping React components for the student-loan refinancing flow and consolidating the team's tribal QA notes into a single static knowledge site that became the canonical reference for new engineers joining the team.",
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
		<section className='my-journey' id='experience' aria-labelledby='experience-heading'>
			<span className='sectiontag' aria-hidden='true' />
			<div className='my-journey__content'>
				<h2 id='experience-heading' className='my-journey__headingPrimary'>
					<span className='my-journey__sectionNumber'>02.</span> Experience
				</h2>
				<VerticalTimeline animate={true} layout='1-column-left' lineColor='rgba(255, 215, 0, 0.2)'>
					{workExperience.map((job) => (
						<VerticalTimelineElement
							key={job.company}
							date={job.duration}
							iconStyle={{ background: 'var(--secondary)', color: 'var(--primary)' }}
							icon={<i className={job.icon} aria-hidden='true'></i>}
						>
							<article className='vertical-timeline-element-content'>
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
							</article>
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
			<span className='sectiontag sectiontag--close' aria-hidden='true' />
		</section>
	);
};

export default Touch;
