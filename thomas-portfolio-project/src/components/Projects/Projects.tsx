import './projects.scss';


const Project = () => {
	return (
		<section className='project' id='projects' aria-labelledby='projects-heading'>
			<span className='sectiontag'>&lt;section&gt;</span>
			<h2 id='projects-heading' className='about__headingPrimary'>
				<span className='about__sectionNumber'>03.</span> Projects
			</h2>

			{/* ----------------------------------------- for desktops -------------------------- */}

			
				<article className='project__section'>
					<a
						className='project__left project__imgLink'
						href='https://github.com/tjreese90'
						target='_blank'
						rel='noreferrer'
						aria-label='View TraderDan repositories on GitHub (opens in new tab)'
					>
						<img
							className='project__img'
							src='/images/project-traderdan.png'
							alt='TraderDan dashboard — Fleet Command view with 14-agent AI team'
						/>
						<span className='project__imgOverlay' aria-hidden='true'>
							<svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2'>
								<path d='M14 3h7v7M10 14L21 3M21 14v7H3V3h7' />
							</svg>
						</span>
					</a>
					<div className='project__right'>
						<p className='project__headingTertiary'>Featured Project</p>
						<span className='project__status project__status--live'>
							<span className='project__statusDot' aria-hidden='true' />
							Live
						</span>
						<h3 className='project__headingSecondary'>
							<a
								href='https://github.com/tjreese90'
								target='_blank'
								rel='noreferrer'
								aria-label='View TraderDan source on GitHub (opens in new tab)'
							>
								TraderDan — Automated Trading System
							</a>
						</h3>
						<div className='project__descriptionContainer'>
							<p className='project__description'>
								A production trading system orchestrated by a 14-agent AI
								team. Built on a TradeLocker integration with a backtest
								engine, signal generator, webhook execution server, prop-firm
								risk engine, news filter, and a Next.js dashboard for live
								monitoring across five active accounts.
							</p>
							<ul className='project__tags'>
								{['Python', 'Next.js', 'FastAPI', 'PostgreSQL', 'Anthropic Claude', 'Optuna', 'ChromaDB'].map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
							<div className='project__icons'>
								<a
									href='https://github.com/tjreese90'
									target='_blank'
									rel='noreferrer'
									aria-label='View TraderDan on GitHub (opens in new tab)'
								>
									<svg className='project__icon'>
										<use href='/icons/symbol-defs.svg#icon-github' />
									</svg>
								</a>
							</div>
						</div>
					</div>
				</article>
			

			
				<article className='project__section'>
					<div className='project__left1'>
						<p className='project__headingTertiary'>Featured Project</p>
						<span className='project__status project__status--live'>
							<span className='project__statusDot' aria-hidden='true' />
							Live
						</span>
						<h3 className='project__headingSecondary'>
							<a
								href='https://blueridgecanineacademy.com/'
								target='_blank'
								rel='noreferrer'
								aria-label='Visit Blue Ridge Canine Academy live site (opens in new tab)'
							>
								Blue Ridge Canine Academy
							</a>
						</h3>
						<div className='project__descriptionContainer project__descriptionContainer1'>
							<p className='project__description'>
								A freelance full-stack scheduling and payments platform for a
								local dog trainer. React frontend, Node.js + Express backend,
								MongoDB persistence, and Acuity Scheduling integration.
								Wireframed in Figma and hosted on GoDaddy.
							</p>
							<ul className='project__tags'>
								{['React.js', 'Node.js', 'Express.js', 'MongoDB', 'SCSS/SASS', 'Acuity Scheduling'].map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
							<div className='project__icons project__icons1'>
								<a
									href='https://blueridgecanineacademy.com/'
									target='_blank'
									rel='noreferrer'
									aria-label='Open Blue Ridge Canine Academy live site (opens in new tab)'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='project__icon'>
										<use href='icons/symbol-defs.svg#icon-external-link' />
									</svg>
								</a>
							</div>
						</div>
					</div>
					<a
						className='project__right project__imgLink'
						href='https://blueridgecanineacademy.com/'
						target='_blank'
						rel='noreferrer'
						aria-label='Visit Blue Ridge Canine Academy live site (opens in new tab)'
					>
						<img
							className='project__img'
							src='/images/project-1.png'
							alt='Blue Ridge Canine Academy — scheduling and payments site'
						/>
						<span className='project__imgOverlay' aria-hidden='true'>
							<svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2'>
								<path d='M14 3h7v7M10 14L21 3M21 14v7H3V3h7' />
							</svg>
						</span>
					</a>
				</article>
			

			
				<article className='project__section'>
					<div className='project__left1'>
						<p className='project__headingTertiary'>Featured Project</p>
						<span className='project__status project__status--live'>
							<span className='project__statusDot' aria-hidden='true' />
							Live
						</span>
						<h3 className='project__headingSecondary'>
							<a
								href='https://github.com/tjreese90/AI-Form-Builder-Web-App'
								target='_blank'
								rel='noreferrer'
								aria-label='View AI Form Builder source on GitHub (opens in new tab)'
							>
								AI Form Builder
							</a>
						</h3>
						<div className='project__descriptionContainer project__descriptionContainer1'>
							<p className='project__description'>
								A full-stack React app that uses Gemini to generate custom
								forms from natural-language prompts. Node.js + Express.js
								backend with MongoDB for persistence, plus a clean React
								frontend for the form-builder UX.
							</p>
							<ul className='project__tags'>
								{['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI', 'SCSS'].map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
							<div className='project__icons project__icons1'>
								<a
									href='https://github.com/tjreese90/AI-Form-Builder-Web-App'
									target='_blank'
									rel='noreferrer'
									aria-label='Open AI Form Builder on GitHub (opens in new tab)'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='project__icon'>
										<use href='icons/symbol-defs.svg#icon-external-link' />
									</svg>
								</a>
							</div>
						</div>
					</div>
					<a
						className='project__right project__imgLink'
						href='https://github.com/tjreese90/AI-Form-Builder-Web-App'
						target='_blank'
						rel='noreferrer'
						aria-label='View AI Form Builder source on GitHub (opens in new tab)'
					>
						<img
							className='project__img'
							src='/images/project-2.png'
							alt='AI Form Builder — Gemini-powered dynamic form generator'
						/>
						<span className='project__imgOverlay' aria-hidden='true'>
							<svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2'>
								<path d='M14 3h7v7M10 14L21 3M21 14v7H3V3h7' />
							</svg>
						</span>
					</a>
				</article>
			

			
				<article className='project__section project__section3'>
					<a
						className='project__left project__imgLink'
						href='https://github.com/tjreese90/UFC-Blog-Web-App'
						target='_blank'
						rel='noreferrer'
						aria-label='View UFC Fight Prediction Generator source on GitHub (opens in new tab)'
					>
						<img
							className='project__img'
							src='/images/project-3.png'
							alt='UFC Fight Prediction Generator — ML-driven matchup predictor'
						/>
						<span className='project__imgOverlay' aria-hidden='true'>
							<svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2'>
								<path d='M14 3h7v7M10 14L21 3M21 14v7H3V3h7' />
							</svg>
						</span>
					</a>
					<div className='project__right'>
						<p className='project__headingTertiary'>Featured Project</p>
						<span className='project__status project__status--wip'>
							<span className='project__statusDot' aria-hidden='true' />
							In Development
						</span>
						<h3 className='project__headingSecondary'>
							<a
								href='https://github.com/tjreese90/UFC-Blog-Web-App'
								target='_blank'
								rel='noreferrer'
								aria-label='View UFC Fight Prediction Generator on GitHub (opens in new tab)'
							>
								UFC Fight Prediction Generator
							</a>
						</h3>
						<div className='project__descriptionContainer'>
							<p className='project__description'>
								A fight-prediction app powered by the UFC MMA V2 API. It
								combines historical fight data with a machine-learning model
								to produce per-matchup outcome estimates, surfaced through a
								React + Vite frontend with MongoDB-backed match history.
							</p>
							<ul className='project__tags'>
								{['React.js', 'Node.js', 'Vite.js', 'MongoDB', 'UFC MMA V2 API', 'SCSS/SASS'].map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
							<div className='project__icons'>
								<a
									href='https://github.com/tjreese90/UFC-Blog-Web-App'
									target='_blank'
									rel='noreferrer'
									aria-label='Open UFC Fight Prediction Generator on GitHub (opens in new tab)'
									style={{ marginRight: '1.6rem' }}
								>
									<svg className='project__icon'>
										<use href='icons/symbol-defs.svg#icon-external-link' />
									</svg>
								</a>
							</div>
						</div>
					</div>
				</article>
			

			{/* --------------------------------------------------- for Mobiles ----------------------------------------------------------------- */}

			<ul className='projectResp__list'>
				<li className='projectResp__items projectResp__items1'>
					<div className='projectResp__card'>
						<div className='projectResp__cardTop'>
							<svg className='projectResp__cardFolder'>
								<use href='icons/symbol-defs.svg#icon-folder' />
							</svg>
							<div className='projectResp__cardLink'>
								<a
									href='https://github.com/tjreese90'
									target='_blank'
									rel='noreferrer'
									style={{ marginRight: '1.6rem' }}
									aria-label='View Thomas Reese GitHub for TraderDan and related projects'
								>
									<svg className='projectResp__icon'>
										<use href='/icons/symbol-defs.svg#icon-github' />
									</svg>
								</a>
							</div>
						</div>
						<div className='projectResp__cardBody'>
							<div className='projectResp__cardBodyHeading'>
								TraderDan — Automated Trading System
							</div>
							<p className='projectResp__cardBodyDescription'>
								Production trading system orchestrated by a 14-agent AI team.
								Built on TradeLocker with a FastAPI webhook execution server,
								prop-firm risk engine, eval harness, ChromaDB memory, and a
								Next.js dashboard for live monitoring.
							</p>
						</div>
						<div className='projectResp__cardFooter'>
							<ul className='projectResp__tags'>
								{['Python', 'Next.js', 'FastAPI', 'PostgreSQL', 'Anthropic Claude', 'ChromaDB', 'Optuna'].map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
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
							<ul className='projectResp__tags'>
								{['React.js', 'Node.js', 'Express.js', 'MongoDB', 'SCSS/SASS'].map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
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
							<ul className='projectResp__tags'>
								{['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI', 'SCSS/SASS'].map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
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
							<ul className='projectResp__tags'>
								{['React.js', 'Node.js', 'Express.js', 'MongoDB', 'UFC MMA V2 API', 'SCSS/SASS'].map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
						</div>
					</div>
				</li>
			</ul>

			<span className='sectiontag'>&lt;/section&gt;</span>
		</section>
	);
};

export default Project;
