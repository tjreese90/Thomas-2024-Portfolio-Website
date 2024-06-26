// About.tsx
// About Me Section

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AnimatedLettersFast from '../AnimatedLettersFast/AnimatedLettersFast';
import './about.scss';

const About = () => {
	const [letterClass, setLetterClass] = useState('text-animate-fast');
	const nameArray = [...'01. About Me'];
	const skillsArray = [
		'JavaScript (ES6+)',
		'TypeScript',
		'HTML',
		'CSS',
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
	];

	const TIMEOUT_DURATION = 4000;

	useEffect(() => {
		const timer = setTimeout(() => {
			setLetterClass('text-animate-fast-hover');
		}, TIMEOUT_DURATION);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='about' id='about' aria-labelledby='about-heading'>
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
					<p>
						Hello! My name is{' '}
						<span className='about__link'>Thomas&nbsp;Reese</span>, a Front-End
						Developer based in Lisle, Illinois. I am passionate about creating
						intuitive and dynamic user experiences through captivating UI
						effects and animations.
					</p>
					<p>
						I hold a Bachelor of Science in Computer Science from Dominican
						University, where I graduated with a GPA of 3.8. My coursework
						included Object-Oriented Programming, Data Structures and
						Algorithms, Database Systems, Advanced Artificial Intelligence, and
						more.
					</p>
					<p>
						Professionally, I have experience as an Infrastructure Engineer and
						Front-End Software Developer Intern at Credit Karma, where I
						developed React functions, improved documentation accessibility, and
						applied Agile methodologies. I also worked as a Front-End Web
						Developer at Sprout Social, where I enhanced performance and reduced
						frontend errors by integrating RESTful APIs.
					</p>
					<p>
						I have competed in several coding competitions and hackathons,
						including the JPMorgan Code for Good Competition and the Google X
						Code Nation hackathon, where my team placed 2nd.
					</p>
					<p>
						Here are some of the technologies I have been working with recently:
					</p>
					<ul className='about__skillsList'>
						{skillsArray.map((skill, index) => (
							<li key={index} className='about__skillsItems'>
								{skill}
							</li>
						))}
					</ul>
				</div>
				<span className='sectiontag'>&lt;/section&gt;</span>
			</div>
			<div className='about__right'>
				<div className='stage-cube-cont'>
					<div className='cubespinner'>
						<div className='face1'>
							<svg className='about__icon'>
								<use href='icons/symbol-defs.svg#icon-python' />
							</svg>
						</div>
						<div className='face2'>
							<svg className='about__icon'>
								<use href='icons/symbol-defs.svg#icon-css3' />
							</svg>
						</div>
						<div className='face3'>
							<svg className='about__icon'>
								<use href='icons/symbol-defs.svg#icon-javascript' />
							</svg>
						</div>
						<div className='face4'>
							<svg className='about__icon'>
								<use href='icons/symbol-defs.svg#icon-mongodb' />
							</svg>
						</div>
						<div className='face5'>
							<svg className='about__icon'>
								<use href='icons/symbol-defs.svg#icon-node-dot-js' />
							</svg>
						</div>
						<div className='face6'>
							<svg className='about__icon'>
								<use href='icons/symbol-defs.svg#icon-react' />
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

About.propTypes = {
	letterClass: PropTypes.string,
	nameArray: PropTypes.array,
	skillsArray: PropTypes.array,
};

export default About;
