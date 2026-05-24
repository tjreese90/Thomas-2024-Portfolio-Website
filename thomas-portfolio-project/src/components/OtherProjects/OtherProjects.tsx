import { useState, useEffect } from 'react';
import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';
import './otherProjects.scss';

const projects = [
	{
		title: 'AI and Metaverse Engagement Landing Page',
		description:
			'A landing page that introduces the metaverse and showcases new ideas. Uses Framer Motion for motion design and React for interaction.',
		link: 'https://github.com/tjreese90/Metaverse-Madness',
		tags: ['Framer Motion', 'React', 'JavaScript', 'CSS'],
	},
	{
		title: '3D Clothing Store with AI Integration',
		description:
			'Interactive 3D clothing store that integrates the Gemini API so users can generate custom 3D shirt designs.',
		link: 'https://github.com/tjreese90/3D-Clothing-Store',
		tags: ['Three.js', 'React Three Fiber', 'Gemini API', 'JavaScript'],
	},
	{
		title: 'World Clock Widget',
		description:
			'A visual world clock embedded into my Notion journal — built in HTML, CSS, and JavaScript and used during trading sessions.',
		link: 'https://codepen.io/tjreese90/pen/MWRRvXV',
		tags: ['CodePen', 'JavaScript', 'HTML', 'CSS'],
	},
	{
		title: 'Connect 4 AI Web App',
		description:
			'Connect 4 game with Minimax-based difficulty modes, a Gemini-powered hint system, and a leaderboard.',
		link: 'https://github.com/tjreese90/Connect-4-Web-App',
		tags: ['Gemini API', 'Minimax', 'React', 'Node.js'],
	},
	{
		title: '3D Earth Simulation',
		description:
			'A 3D Earth built with Three.js: orbital camera, atmospheric scattering, and texture-mapped globe.',
		link: 'https://github.com/tjreese90/3D-Earth',
		tags: ['Three.js', 'JavaScript', 'WebGL', 'CSS'],
	},
];

const OtherProjects = () => {
	const [letterClass, setLetterClass] = useState('text-animate-fast');
	const nameArray = [...'Other Projects'];

	useEffect(() => {
		const timer = setTimeout(
			() => setLetterClass('text-animate-fast-hover'),
			4000,
		);
		return () => clearTimeout(timer);
	}, []);

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
				{projects.map((project) => (
					<li className='other__items' key={project.title}>
						<div className='other__card'>
							<div className='other__cardTop'>
								<svg className='other__cardFolder'>
									<use href='/icons/symbol-defs.svg#icon-folder' />
								</svg>
								<div className='other__cardLink'>
									<a
										href={project.link}
										target='_blank'
										rel='noreferrer'
										aria-label={`Open ${project.title}`}
									>
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
									{project.tags.map((tag) => (
										<span key={tag}>{tag} &nbsp;</span>
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
