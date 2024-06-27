import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import AnimatedLettersFast from '../AnimatedLettersFast/AnimatedLettersFast';
import './about.scss';

const About = () => {
	const [letterClass, setLetterClass] = useState('text-animate-fast');
	const nameArray = [...'01. About Me'];
	const skillsArray = [
		'JavaScript (ES6+)',
		'TypeScript',
		'HTML/ CSS / JS',
		'Scss / Sass',
		'React.js & Redux',
		'Next.js',
		'Angular',
		'Node.js',
		'Express.js',
		'MongoDB',
		'SQL',
		'GraphQL',
		'REST APIs',
		'Docker',
		'Kubernetes',
		'AWS',
		'Google Cloud Platform',
		'GitHub',
		'CircleCI',
		'Webpack',
		'Babel',
		'Tailwind CSS',
		'Bootstrap',
		'Jest',
		'Cypress',
		'Figma',
		'Netlify',
		'Heroku',
		'Vercel',
		'Three.js',
		'3D.js',
		'Trading Strategies',
		'Forex Analysis',
	];

	const TIMEOUT_DURATION = 4000;

	useEffect(() => {
		const timer = setTimeout(() => {
			setLetterClass('text-animate-fast-hover');
		}, TIMEOUT_DURATION);
		return () => clearTimeout(timer);
	}, []);

	const paragraphVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section className='about' id='about' aria-labelledby='about-heading'>
			<div className='about__left'>
				<span className='sectiontag'>&lt;section&gt;</span>
				<h1 id='about-heading' className='about__headingPrimary'>
					<AnimatedLettersFast
						letterClass={letterClass}
						strArray={nameArray}
						idx={15}
					/>
				</h1>
				<div className='about__description'>
					<motion.p
						initial='hidden'
						animate='visible'
						variants={paragraphVariants}
						transition={{ duration: 0.6 }}
					>
						Hello! My name is{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							Thomas&nbsp;Reese
						</motion.span>
						, a Front-End Developer based in Lisle, Illinois. I am passionate
						about creating intuitive and dynamic user experiences through
						captivating UI effects and animations.
					</motion.p>
					<motion.p
						initial='hidden'
						animate='visible'
						variants={paragraphVariants}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						I hold a{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							Bachelor of Science in Computer Science
						</motion.span>{' '}
						from Dominican University, where I graduated with a GPA of 3.8. My
						coursework included{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							Object-Oriented Programming
						</motion.span>
						,{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							Data Structures and Algorithms
						</motion.span>
						,{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							Database Systems
						</motion.span>
						,{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							Advanced Artificial Intelligence
						</motion.span>
						, and more.
					</motion.p>
					<motion.p
						initial='hidden'
						animate='visible'
						variants={paragraphVariants}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						Professionally, I have experience as an{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							Infrastructure Engineer
						</motion.span>{' '}
						and
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							{' '}
							Front-End Software Developer Intern
						</motion.span>{' '}
						at Credit Karma, where I developed React functions, improved
						documentation accessibility, and applied Agile methodologies. I also
						worked as a{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							Front-End Web Developer
						</motion.span>{' '}
						at Sprout Social, where I enhanced performance and reduced frontend
						errors by integrating RESTful APIs.
					</motion.p>
					<motion.p
						initial='hidden'
						animate='visible'
						variants={paragraphVariants}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						I have competed in several coding competitions and hackathons,
						including the{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							JPMorgan Code for Good Competition
						</motion.span>{' '}
						and the{' '}
						<motion.span
							className='about__highlight'
							whileHover={{ scale: 1.1, color: '#ff8c00' }}
						>
							Google X Code Nation hackathon
						</motion.span>
						, where my team placed 2nd.
					</motion.p>
					<motion.p
						initial='hidden'
						animate='visible'
						variants={paragraphVariants}
						transition={{ duration: 0.6, delay: 0.8 }}
					>
						Here are some of the technologies I have been working with recently:
					</motion.p>
					<motion.ul
						className='about__skillsList'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 1 }}
					>
						{skillsArray.map((skill, index) => (
							<li key={index} className='about__skillsItems'>
								{skill}
							</li>
						))}
					</motion.ul>
				</div>
				<span className='sectiontag'>&lt;/section&gt;</span>
			</div>
			<div className='about__right'>
				<div className='stage-cube-cont'>
					<div className='cubespinner'>
						<div className='face1'>
							<svg className='about__icon'>
								<use xlinkHref='icons/symbol-defs.svg#icon-python' />
							</svg>
						</div>
						<div className='face2'>
							<svg className='about__icon'>
								<use xlinkHref='icons/symbol-defs.svg#icon-css3' />
							</svg>
						</div>
						<div className='face3'>
							<svg className='about__icon'>
								<use xlinkHref='icons/symbol-defs.svg#icon-javascript' />
							</svg>
						</div>
						<div className='face4'>
							<svg className='about__icon'>
								<use xlinkHref='icons/symbol-defs.svg#icon-mongodb' />
							</svg>
						</div>
						<div className='face5'>
							<svg className='about__icon'>
								<use xlinkHref='icons/symbol-defs.svg#icon-node-dot-js' />
							</svg>
						</div>
						<div className='face6'>
							<svg className='about__icon'>
								<use xlinkHref='icons/symbol-defs.svg#icon-react' />
							</svg>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

About.propTypes = {
	letterClass: PropTypes.string,
	nameArray: PropTypes.array,
	skillsArray: PropTypes.array,
};

export default About;
