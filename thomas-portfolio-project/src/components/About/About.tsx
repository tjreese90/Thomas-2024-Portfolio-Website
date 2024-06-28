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

	const skillsContainerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const skillsItemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
		whileHover: {
			scale: 1.2,
			rotate: 5,
			color: '#ff8c00',
			transition: { type: 'spring', stiffness: 300 },
		},
	};

	const continuousAnimation = {
		animate: {
			y: [0, -10, 0],
			transition: {
				y: {
					repeat: Infinity,
					repeatType: 'mirror',
					duration: 2,
				},
			},
		},
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
						<span className='highlight'>Thomas&nbsp;Reese</span>, a Front-End
						Developer based in Lisle, Illinois. I am passionate about creating
						intuitive and dynamic user experiences through captivating UI
						effects and animations.
					</motion.p>
					<motion.p
						initial='hidden'
						animate='visible'
						variants={paragraphVariants}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						I graduated from{' '}
						<a
							href='https://www.dom.edu/'
							target='_blank'
							className='highlight'
						>
							Dominican University
						</a>{' '}
						in 2022 with a{' '}
						<span className='highlight'>
							Bachelor of Science in Computer Science
						</span>
						. My coursework included{' '}
						<a
							href='https://realpython.com/python3-object-oriented-programming/'
							target='_blank'
							className='highlight'
						>
							Object-Oriented Programming
						</a>
						,{' '}
						<a
							href='https://www.geeksforgeeks.org/data-structures/'
							target='_blank'
							className='highlight'
						>
							Data Structures and Algorithms
						</a>
						,{' '}
						<a
							href='https://planetscale.com/learn/articles/what-is-a-database'
							target='_blank'
							className='highlight'
						>
							Database Systems
						</a>
						,{' '}
						<a
							href='https://www.hackerearth.com/blog/developers/artificial-intelligence-101-how-to-get-started/'
							target='_blank'
							className='highlight'
						>
							Advanced Artificial Intelligence
						</a>
						, and more.
					</motion.p>
					<motion.p
						initial='hidden'
						animate='visible'
						variants={paragraphVariants}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						Professionally, I have experience as an{' '}
						<a
							href='https://medium.com/@joatmon08/the-infrastructure-engineers-identity-crisis-2cc545397240'
							target='_blank'
							className='highlight'
						>
							Infrastructure Engineer
						</a>{' '}
						and
						<span className='highlight'>
							{' '}
							<a
								href='https://developer.mozilla.org/en-US/curriculum/'
								target='_blank'
								className='highlight'
							>
								Front-End
							</a>{' '}
							Software Developer Intern
						</span>{' '}
						at Credit Karma, where I developed React functions, improved
						documentation accessibility, and applied Agile methodologies. I also
						worked as a{' '}
						<span className='highlight'>Front-End Web Developer</span> at Sprout
						Social, where I enhanced performance and reduced frontend errors by
						integrating RESTful APIs.
					</motion.p>
					<motion.p
						initial='hidden'
						animate='visible'
						variants={paragraphVariants}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						I have competed in several coding competitions and hackathons,
						including the{' '}
						<a
							href='https://careers.jpmorgan.com/us/en/students/programs/code-for-good'
							target='_blank'
							className='highlight'
						>
							JPMorgan Code for Good Competition
						</a>{' '}
						and the{' '}
						<a
							href='https://www.codenation.org/'
							target='_blank'
							className='highlight'
						>
							Google X Code Nation hackathon
						</a>{' '}
						where my team placed 2nd.
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
						initial='hidden'
						animate='visible'
						variants={skillsContainerVariants}
					>
						{skillsArray.map((skill, index) => (
							<motion.li
								key={index}
								className='about__skillsItems'
								variants={skillsItemVariants}
								whileHover='whileHover'
								whileTap='whileTap'
								{...continuousAnimation}
							>
								{skill}
							</motion.li>
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
