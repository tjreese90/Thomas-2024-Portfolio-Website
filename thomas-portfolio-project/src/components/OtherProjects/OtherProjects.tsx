import React, { useState, useEffect, useMemo } from 'react';
import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';
import './otherProjects.scss';

const OtherProjects = () => {
	const [letterClass, setLetterClass] = useState('text-animate-fast');
	const nameArray = useMemo(() => [...'Other Projects'], []);

	useEffect(() => {
		const timer = setTimeout(
			() => setLetterClass('text-animate-fast-hover'),
			4000,
		);
		return () => clearTimeout(timer);
	}, []);

	// Project data array
	const projects = useMemo(
		() => [
			{
				title: 'AI and Metaverse Engagement Landing Page',
				description:
					'A landing page designed to educate people about the metaverse and share new ideas. Utilizes advanced animations from Framer Motion and React.',
				link: 'https://github.com/tjreese90/Metaverse-Madness',
				tags: ['Framer Motion', 'React', 'JavaScript', 'CSS'],
			},
			{
				title: '3D Clothing Store with AI Integration',
				description:
					'An interactive 3D clothing store that integrates with the Gemini API to allow users to create custom 3D shirt designs.',
				link: 'https://github.com/tjreese90/3D-Clothing-Store',
				tags: ['Three.js', 'React Three Fiber', 'Gemini API', 'JavaScript'],
			},
			{
				title: 'World Clock Widget',
				description:
					'A visual world clock widget embedded into my Notion journal. Developed to assist in trading, using HTML, CSS, and JavaScript.',
				link: 'https://codepen.io/tjreese90/pen/MWRRvXV',
				tags: ['CodePen', 'JavaScript', 'HTML', 'CSS'],
			},
			{
				title: 'Connect 4 AI Web App',
				description:
					'A Connect 4 game using the Gemini API, featuring a leaderboard and difficulty modes using algorithms like Minimax.',
				link: 'https://github.com/tjreese90/Connect-4-Web-App',
				tags: ['Gemini API', 'Minimax', 'React', 'Node.js'],
			},
			{
				title: '3D Earth Simulation',
				description:
					'A 3D earth simulation using Three.js and advanced JavaScript animations to create a realistic representation of Earth.',
				link: 'https://github.com/tjreese90/3D-Earth',
				tags: ['Three.js', 'JavaScript', 'WebGL', 'CSS'],
			},
		],
		[],
	);

	return (
		<div className='other-project' id='other-project'>
			<span className='sectiontag'>&lt;section&gt;</span>
			<div className='other__container'>
				<h1 className='other__headingPrimary'>
					<AnimatedLettersFast
						letterClass={letterClass}
						strArray={nameArray}
						idx={15}
					/>
				</h1>
			</div>

			<ul className='other__list'>
				{projects.map((project, index) => (
					<li className='other__items' key={index}>
						<div className='other__card'>
							<div className='other__cardTop'>
								<svg className='other__cardFolder'>
									<use href='icons/symbol-defs.svg#icon-folder' />
								</svg>
								<div className='other__cardLink'>
									<a href={project.link} target='_blank' rel='noreferrer'>
										<svg className='other__icon'>
											<use href='/icons/symbol-defs.svg#icon-github' />
										</svg>
									</a>
								</div>
							</div>
							<div className='other__cardBody'>
								<div className='other__cardBodyHeading'>{project.title}</div>
								<p className='other__cardBodyDescription'>
									{project.description}
								</p>
							</div>
							<div className='other__cardFooter'>
								<div className='other__tags'>
									{project.tags.map((tag, tagIndex) => (
										<span key={tagIndex}>{tag} &nbsp;</span>
									))}
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>

			<span className='sectiontag'>&lt;/section&gt;</span>
		</div>
	);
};

export default OtherProjects;
