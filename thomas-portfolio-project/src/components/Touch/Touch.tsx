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
//TODO: Fix description and flip logic
const workExperience = [
	{
		company: 'Sprout Social',
		role: 'Front-End Web Developer',
		duration: 'Jan 2022 - March 2024',
		icon: 'fas fa-code',
		techStack: 'JavaScript, HTML, CSS, React, TypeScript',
		description: '',
	},
	{
		company: 'The Walt Disney Company',
		role: 'Software Engineering Intern',
		duration: 'Apr 2021 - Nov 2021',
		icon: 'fas fa-graduation-cap',
		techStack: 'Python, BigQuery, Kubernetes, React',
		description: '',
	},
	{
		company: 'Credit Karma',
		role: 'Infrastructure Engineer / QA Intern',
		duration: 'Jan 2020 - Jan 2021',
		icon: 'fas fa-briefcase',
		techStack: 'React, Node.js, AWS, Ruby, Python',
		description: '',
	},
];

const personalProjects = [
	{
		name: 'Automated Trading System',
		description:
			"A sophisticated trading application leveraging Oanda's API and Python scripts to automatically analyze multiple assets across various timeframes and execute trades based on meticulously backtested strategies. This comprehensive solution integrates React for the frontend, Flask for the backend, and Jupyter Notebook for data analysis and visualization.",
		link: 'https://github.com/yourusername/automated-trading-system', // Update with actual link
	},
	{
		name: 'Next-Gen Fitness Tracker',
		description:
			'An advanced React Native application designed to provide a holistic fitness tracking experience. This full-stack solution includes features such as user authentication, activity tracking, and data visualization. Developed to enhance personal fitness goals with potential for scalability and broader application.',
		link: 'https://github.com/yourusername/next-gen-fitness-tracker', // Update with actual link
	},
];

const goals = [
	'Become a lead developer in a dynamic team.',
	'Contribute to open-source projects.',
	'Continue learning and growing in the field of software development.',
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
				<label htmlFor='myJourneyLabel' className='my-journey__label'>
					<h1 className='my-journey__headingPrimary'>
						<AnimatedLettersFast
							letterClass={letterClass}
							strArray={nameArray}
							idx={15}
						/>
					</h1>
				</label>
				<div className='banner'>
					<h2 className='goals-banner'>Goals and Aspirations</h2>
					<ul>
						{goals.map((goal, index) => (
							<li key={index}>{goal}</li>
						))}
					</ul>
				</div>
				<h2 className='my-journey__subheading'>Work Experience</h2>
				<VerticalTimeline>
					{workExperience.map((job, index) => (
						<VerticalTimelineElement
							key={index}
							date={job.duration}
							iconStyle={{ background: 'var(--primary)', color: '#fff' }}
							icon={<i className={job.icon}></i>}
						>
							<motion.div
								className={`vertical-timeline-element-content ${
									flippedIndex === index ? 'flipped' : ''
								}`}
								onClick={() => handleCardClick(index)}
							>
								<div className='vertical-timeline-element-front'>
									<h3
										className={`vertical-timeline-element-title ${
											index === 1
												? 'vertical-timeline-element-title-second'
												: ''
										}`}
									>
										{job.company}
									</h3>
									<h4
										className={`vertical-timeline-element-subtitle ${
											index === 1
												? 'vertical-timeline-element-subtitle-second'
												: ''
										}`}
									>
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
				<h2 className='my-journey__subheading'>
					Current Projects in Development
				</h2>
				<div className='my-journey__projects'>
					{personalProjects.map((project, index) => (
						<motion.div
							key={index}
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
