import { useState, useEffect } from 'react';
import './projects.scss';
import LazyLoad from 'react-lazyload';
import AnimatedLettersFast from '@components/AnimatedLettersFast/AnimatedLettersFast';

const Project = () => {
	const [letterClass, setLetterClass] = useState('text-animate-fast');
	const nameArray = [...'02. My Projects'];

	useEffect(() => {
		const timer = setTimeout(() => {
			setLetterClass('text-animate-fast-hover');
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className='project' id='projects'>
			<span className='sectiontag'>&lt;section&gt;</span>
			<h1 className='about__headingPrimary'>
				<AnimatedLettersFast
					letterClass={letterClass}
					strArray={nameArray}
					idx={15}
				/>
			</h1>

			{/* ----------------------------------------- for desktops -------------------------- */}

			<LazyLoad once height={400}>
				<section className='project__section'>
					<div className='project__left'>
						<img
							className='project__img'
							src='/images/project-traderdan.png'
							alt='TraderDan dashboard — Fleet Command view with 14-agent AI team'
						/>
					</div>
					<div className='project__right'>
						<h3 className='project__headingTertiary'>Featured Project</h3>
						<h5>Live</h5>
						<span className='project__headingSecondary'>
							<h2>TraderDan — Automated Trading System</h2>
						</span>
						<div className='project__descriptionContainer'>
							<p className='project__description'>
								A production trading system orchestrated by a 14-agent AI
								team. Built on a TradeLocker integration with a backtest
								engine, signal generator, webhook execution server, prop-firm
								risk engine, news filter, and a Next.js dashboard for live
								monitoring across five active accounts.
							</p>
							<div className='project__tags'>
								{' '}
								Python &nbsp; Next.js &nbsp; FastAPI &nbsp; PostgreSQL &nbsp;
								Anthropic Claude &nbsp; Optuna &nbsp; ChromaDB &nbsp;
							</div>
						</div>
					</div>
				</section>
			</LazyLoad>

			<LazyLoad once height={400}>
				<section className='project__section'>
					<div className='project__left1'>
						<h3 className='project__headingTertiary'>Featured Project</h3>
						<a
							href='https://blueridgecanineacademy.com/'
							target='_blank'
							rel='noreferrer'
							className='project__headingSecondary'
						>
							<h2>Blue Ridge Canine Academy</h2>
						</a>
						<div className='project__descriptionContainer'>
							<p className='project__description'>
								Blue Ridge Canine Academy is a comprehensive dog training
								platform with integrated scheduling and payment functionalities.
								The application leverages modern web technologies to offer a
								seamless user experience, enabling clients to effortlessly book
								training sessions and manage payments. The project showcases
								proficiency in full stack development, integrating React for the
								frontend, Node.js and Express.js for the backend, and MongoDB
								for data persistence.
							</p>
							<div className='project__tags'>
								{' '}
								React.js &nbsp; Node.js &nbsp; Express.js &nbsp; MongoDB &nbsp;
								SCSS/SASS &nbsp; Acuity Scheduling &nbsp;
							</div>
							<div className='project__icons'>
								<a
									href='https://blueridgecanineacademy.com/'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='project__icon'>
										<use href='icons/symbol-defs.svg#icon-external-link' />
									</svg>
								</a>
							</div>
						</div>
					</div>
					<div className='project__right'>
						<img
							className='project__img'
							src='/images/project-1.png'
							alt='Blue Ridge Canine Academy'
						/>
					</div>
				</section>
			</LazyLoad>

			<LazyLoad once height={400}>
				<section className='project__section'>
					<div className='project__left1'>
						<h3 className='project__headingTertiary'>Featured Project</h3>
						<h5>Live</h5>
						<a
							href='https://github.com/tjreese90/AI-Form-Builder-Web-App'
							target='_blank'
							rel='noreferrer'
							className='project__headingSecondary'
						>
							<h2>AI Form Builder</h2>
						</a>
						<div className='project__descriptionContainer project__descriptionContainer1'>
							<p className='project__description'>
								A full-stack React app that uses Gemini to generate custom
								forms from natural-language prompts. Node.js + Express.js
								backend with MongoDB for persistence, plus a clean React
								frontend for the form-builder UX.
							</p>
							<div className='project__tags'>
								React.js &nbsp; Node.js &nbsp; Vue.js &nbsp; MongoDB &nbsp;
								Gemini AI &nbsp; SCSS/SASS &nbsp; API
							</div>
							<div className='project__icons project__icons1'>
								<a
									href='https://github.com/tjreese90/AI-Form-Builder-Web-App'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='project__icon'>
										<use href='icons/symbol-defs.svg#icon-external-link' />
									</svg>
								</a>
							</div>
						</div>
					</div>
					<div className='project__right'>
						<img
							className='project__img'
							src='/images/project-2.png'
							alt='AI Form Builder'
						/>
					</div>
				</section>
			</LazyLoad>

			<LazyLoad once height={400}>
				<section className='project__section project__section3'>
					<div className='project__left'>
						<img
							className='project__img'
							src='/images/project-3.png'
							alt='UFC Fight Prediction Generator'
						/>
					</div>
					<div className='project__right'>
						<h3 className='project__headingTertiary'>Featured Project</h3>
						<h5>In Development</h5>
						<a
							href='https://github.com/tjreese90/UFC-Blog-Web-App'
							target='_blank'
							rel='noreferrer'
							className='project__headingSecondary'
						>
							<h2>UFC Fight Prediction Generator</h2>
						</a>
						<div className='project__descriptionContainer'>
							<p className='project__description'>
								A fight-prediction app powered by the UFC MMA V2 API. It
								combines historical fight data with a machine-learning model
								to produce per-matchup outcome estimates, surfaced through a
								React + Vite frontend with MongoDB-backed match history.
							</p>
							<div className='project__tags'>
								{' '}
								React.js &nbsp; Node.js &nbsp; Vite.js &nbsp; MongoDB &nbsp; UFC
								MMA V2 API &nbsp; SCSS/SASS
							</div>
							<div className='project__icons'>
								<a
									href='https://github.com/tjreese90/UFC-Blog-Web-App'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='project__icon'>
										<use href='icons/symbol-defs.svg#icon-external-link' />
									</svg>
								</a>
							</div>
						</div>
					</div>
				</section>
			</LazyLoad>

			{/* --------------------------------------------------- for Mobiles ----------------------------------------------------------------- */}

			<ul className='projectResp__list'>
				<li className='projectResp__items projectResp__items1'>
					<div className='projectResp__card'>
						<div className='projectResp__cardTop'>
							<svg className='projectResp__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
						</div>
						<div className='projectResp__cardBody'>
							<div className='projectResp__cardBodyHeading'>
								TraderDan — Automated Trading System
							</div>
							<p className='projectResp__cardBodyDescription'>
								A sophisticated multi-asset automated trading system built on
								OANDA&apos;s API. Features multi-agent AI orchestration, real-time
								risk management across FX and crypto markets, and a Next.js
								dashboard for live monitoring.
							</p>
						</div>
						<div className='projectResp__cardFooter'>
							<div className='projectResp__tags'>
								{' '}
								Python &nbsp; Next.js &nbsp; TypeScript &nbsp; OANDA &nbsp;
								Multi-Agent AI
							</div>
						</div>
					</div>
				</li>
				<li className='projectResp__items projectResp__items1'>
					<div className='projectResp__card'>
						<div className='projectResp__cardTop'>
							<svg className='projectResp__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
							<div className='projectResp__cardLink'>
								<a
									href='https://blueridgecanineacademy.com/'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='projectResp__icon'>
										<use href='icons/symbol-defs.svg#icon-external-link' />
									</svg>
								</a>
							</div>
						</div>
						<div className='projectResp__cardBody'>
							<div className='projectResp__cardBodyHeading'>
								Blue Ridge Canine Academy
							</div>
							<p className='projectResp__cardBodyDescription'>
								A full-stack dog-training platform with integrated scheduling
								and payments. React frontend, Node.js + Express.js backend,
								MongoDB persistence; built as a freelance project for a local
								trainer.
							</p>
						</div>
						<div className='projectResp__cardFooter'>
							<div className='projectResp__tags'>
								{' '}
								React.js &nbsp; Node.js &nbsp; Express.js &nbsp; MongoDB &nbsp;
								SCSS/SASS
							</div>
						</div>
					</div>
				</li>
				<li className='projectResp__items  projectResp__items2'>
					<div className='projectResp__card'>
						<div className='projectResp__cardTop'>
							<svg className='projectResp__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
							<div className='projectResp__cardLink'>
								<a
									href='https://github.com/tjreese90/AI-Form-Builder-Web-App'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='projectResp__icon'>
										<use href='icons/symbol-defs.svg#icon-external-link' />
									</svg>
								</a>
							</div>
						</div>
						<div className='projectResp__cardBody'>
							<div className='projectResp__cardBodyHeading'>
								AI Form Builder
							</div>
							<p className='projectResp__cardBodyDescription'>
								Full-stack React app that uses Gemini to generate custom forms
								from natural-language prompts. Node.js + Express backend,
								MongoDB persistence, clean React UI for the form-builder UX.
							</p>
						</div>
						<div className='projectResp__cardFooter'>
							<div className='projectResp__tags'>
								React.js &nbsp; Node.js &nbsp; Express.js &nbsp; MongoDB &nbsp;
								Gemini AI &nbsp; SCSS/SASS
							</div>
						</div>
					</div>
				</li>
				<li className='projectResp__items projectResp__items3'>
					<div className='projectResp__card'>
						<div className='projectResp__cardTop'>
							<svg className='projectResp__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
							<div className='projectResp__cardLink'>
								<a
									href='https://github.com/tjreese90/UFC-Blog-Web-App'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='projectResp__icon'>
										<use href='icons/symbol-defs.svg#icon-external-link' />
									</svg>
								</a>
							</div>
						</div>
						<div className='projectResp__cardBody'>
							<div className='projectResp__cardBodyHeading'>
								UFC Fight Prediction Generator
							</div>
							<p className='projectResp__cardBodyDescription'>
								A fight-prediction app powered by the UFC MMA V2 API.
								Combines historical fight data with an ML model to produce
								per-matchup outcome estimates, surfaced through a React + Vite
								frontend with MongoDB-backed history.
							</p>
						</div>
						<div className='projectResp__cardFooter'>
							<div className='projectResp__tags'>
								{' '}
								React.js &nbsp; Node.js &nbsp; Express.js &nbsp; MongoDB &nbsp;
								UFC MMA V2 API &nbsp; SCSS/SASS
							</div>
						</div>
					</div>
				</li>
			</ul>

			<span className='sectiontag'>&lt;/section&gt;</span>
		</div>
	);
};

export default Project;
