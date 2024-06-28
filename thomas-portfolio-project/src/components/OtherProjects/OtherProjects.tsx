import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';
import React, { useState, useEffect } from 'react';
import './otherProjects.scss';

const OtherProjects = () => {
	const [letterClass, setLetterClass] = useState('text-animate-fast');
	const nameArray = [...'Other Projects '];

	useEffect(() => {
		setTimeout(() => {
			setLetterClass('text-animate-fast-hover');
		}, 4000);
	}, []);

	return (
		<div className='other'>
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
				<li className='other__items'>
					<div className='other__card'>
						<div className='other__cardTop'>
							<svg className='other__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
							<div className='other__cardLink'>
								<a
									href='https://github.com/tjreese90/Metaverse-Madness'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='other__icon'>
										<use href='/icons/symbol-defs.svg#icon-github' />
									</svg>
								</a>
							</div>
						</div>
						<div className='other__cardBody'>
							<div className='other__cardBodyHeading'>
								AI and Metaverse Engagement Landing Page
							</div>
							<p className='other__cardBodyDescription'>
								A landing page designed to educate people about the metaverse
								and share new ideas. Utilizes advanced animations from Framer
								Motion and React to create a captivating experience.
							</p>
						</div>
						<div className='other__cardFooter'>
							<div className='other__tags'>
								{' '}
								Framer Motion &nbsp; React &nbsp; JavaScript &nbsp; CSS{' '}
							</div>
						</div>
					</div>
				</li>

				<li className='other__items'>
					<div className='other__card'>
						<div className='other__cardTop'>
							<svg className='other__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
							<div className='other__cardLink'>
								<a
									href='https://github.com/tjreese90/3D-Clothing-Store'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='other__icon'>
										<use href='/icons/symbol-defs.svg#icon-github' />
									</svg>
								</a>
							</div>
						</div>
						<div className='other__cardBody'>
							<div className='other__cardBodyHeading'>
								3D Clothing Store with AI Integration
							</div>
							<p className='other__cardBodyDescription'>
								An interactive 3D clothing store that integrates with the Gemini
								API to allow users to create custom 3D shirt designs. Built
								using Three.js, React Three Fiber, and advanced animation
								frameworks.
							</p>
						</div>
						<div className='other__cardFooter'>
							<div className='other__tags'>
								{' '}
								Three.js &nbsp; React Three Fiber &nbsp; Gemini API &nbsp;
								JavaScript{' '}
							</div>
						</div>
					</div>
				</li>

				<li className='other__items'>
					<div className='other__card'>
						<div className='other__cardTop'>
							<svg className='other__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
							<div className='other__cardLink'>
								<a
									href='https://codepen.io/tjreese90/pen/MWRRvXV'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='other__icon'>
										<use href='/icons/symbol-defs.svg#icon-codepen' />
									</svg>
								</a>
							</div>
						</div>
						<div className='other__cardBody'>
							<div className='other__cardBodyHeading'>World Clock Widget</div>
							<p className='other__cardBodyDescription'>
								A visual world clock widget embedded into my Notion journal. One
								of many trading widgets developed to assist in trading, using
								HTML, CSS, and JavaScript.
							</p>
						</div>
						<div className='other__cardFooter'>
							<div className='other__tags'>
								{' '}
								CodePen &nbsp; JavaScript &nbsp; HTML &nbsp; CSS{' '}
							</div>
						</div>
					</div>
				</li>

				<li className='other__items'>
					<div className='other__card'>
						<div className='other__cardTop'>
							<svg className='other__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
							<div className='other__cardLink'>
								<a
									href='https://github.com/tjreese90/Connect-4-Web-App'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='other__icon'>
										<use href='/icons/symbol-defs.svg#icon-github' />
									</svg>
								</a>
							</div>
						</div>
						<div className='other__cardBody'>
							<div className='other__cardBodyHeading'>Connect 4 AI Web App</div>
							<p className='other__cardBodyDescription'>
								A Connect 4 game that uses the Gemini API to play against you,
								featuring a leaderboard and difficulty modes utilizing advanced
								algorithms like Minimax. Built with React and Node.js.
							</p>
						</div>
						<div className='other__cardFooter'>
							<div className='other__tags'>
								{' '}
								Gemini API &nbsp; Minimax &nbsp; React &nbsp; Node.js{' '}
							</div>
						</div>
					</div>
				</li>

				<li className='other__items'>
					<div className='other__card'>
						<div className='other__cardTop'>
							<svg className='other__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
							<div className='other__cardLink'>
								<a
									href='https://github.com/tjreese90/3D-Earth'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='other__icon'>
										<use href='/icons/symbol-defs.svg#icon-github' />
									</svg>
								</a>
							</div>
						</div>
						<div className='other__cardBody'>
							<div className='other__cardBodyHeading'>3D Earth Simulation</div>
							<p className='other__cardBodyDescription'>
								A 3D earth simulation using Three.js and advanced JavaScript
								animations to create a realistic and artistic representation of
								Earth.
							</p>
						</div>
						<div className='other__cardFooter'>
							<div className='other__tags'>
								{' '}
								Three.js &nbsp; JavaScript &nbsp; WebGL &nbsp; CSS{' '}
							</div>
						</div>
					</div>
				</li>
			</ul>
			<span className='sectiontag'>&lt;/section&gt;</span>
		</div>
	);
};

export default OtherProjects;
