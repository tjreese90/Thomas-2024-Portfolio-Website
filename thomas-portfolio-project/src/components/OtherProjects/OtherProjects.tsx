import './otherProjects.scss';

const projects = [
	{
		title: 'AI Form Builder Web App',
		description:
			'AI-assisted form builder with drag-and-drop fields and LLM-powered field suggestions. Generates mobile-responsive forms from natural-language prompts.',
		link: 'https://github.com/tjreese90/AI-Form-Builder-Web-App',
		tags: ['TypeScript', 'React', 'AI Form Generation', 'Drag-and-Drop'],
	},
	{
		title: 'XAUUSD Backtester',
		description:
			'Python backtesting framework for gold (XAUUSD) trading strategies — bar-by-bar replay, position sizing, drawdown analysis, and equity-curve plots feeding the TraderDan signal lab.',
		link: 'https://github.com/tjreese90/XAUUSD-Back-tester',
		tags: ['Python', 'Pandas', 'Backtesting', 'Quant'],
	},
	{
		title: 'Space Miner — Idle Game',
		description:
			'TypeScript idle game with fleet management, planet exploration, and resource economy. Build mining ships, upgrade them, and balance idle accrual against active strategy.',
		link: 'https://github.com/tjreese90/space-miner',
		tags: ['TypeScript', 'Game Mechanics', 'State Management', 'React'],
	},
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
	{
		title: 'World Clock Widget',
		description:
			'A visual world clock embedded into my Notion journal — built in HTML, CSS, and JavaScript and used during trading sessions.',
		link: 'https://codepen.io/tjreese90/pen/MWRRvXV',
		tags: ['CodePen', 'JavaScript', 'HTML', 'CSS'],
	},
];

const OtherProjects = () => {
	return (
		<section className='other-project' id='other-project'>
			<span className='sectiontag'>&lt;section&gt;</span>
			<div className='other__container'>
				<h3 className='other__headingPrimary'>Other Noteworthy Projects</h3>
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
								<h4 className='other__cardBodyHeading'>{project.title}</h4>
								<p className='other__cardBodyDescription'>
									{project.description}
								</p>
							</div>
							<div className='other__cardFooter'>
								<ul className='other__tags'>
									{project.tags.map((tag) => (
										<li key={tag}>{tag}</li>
									))}
								</ul>
							</div>
						</div>
					</li>
				))}
			</ul>

			<span className='sectiontag'>&lt;/section&gt;</span>
		</section>
	);
};

export default OtherProjects;
