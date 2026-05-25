import { useEffect, useRef, useState } from 'react';
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
	const listRef = useRef<HTMLUListElement | null>(null);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(true);

	// Update arrow enabled-state whenever the rail scrolls or the viewport resizes.
	useEffect(() => {
		const el = listRef.current;
		if (!el) return;
		const update = () => {
			const maxScroll = el.scrollWidth - el.clientWidth;
			setCanScrollPrev(el.scrollLeft > 4);
			setCanScrollNext(el.scrollLeft < maxScroll - 4);
		};
		update();
		el.addEventListener('scroll', update, { passive: true });
		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => {
			el.removeEventListener('scroll', update);
			ro.disconnect();
		};
	}, []);

	// Scroll by one card's width — first child gives the rhythm (incl. gap).
	const scrollByCard = (dir: 1 | -1) => {
		const el = listRef.current;
		if (!el) return;
		const card = el.querySelector<HTMLLIElement>('.other__items');
		const styles = window.getComputedStyle(el);
		const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
		const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8;
		el.scrollBy({ left: step * dir, behavior: 'smooth' });
	};

	return (
		<section
			className='other-project'
			id='other-project'
			aria-labelledby='other-project-heading'
		>
			<span className='sectiontag' aria-hidden='true' />
			<div className='other__container'>
				<h2 id='other-project-heading' className='other__headingPrimary'>
					Other Noteworthy Projects
				</h2>
			</div>

			<div className='other__carousel'>
				<button
					type='button'
					className='other__navBtn other__navBtn--prev'
					onClick={() => scrollByCard(-1)}
					disabled={!canScrollPrev}
					aria-label='Scroll to previous projects'
				>
					<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
						<polyline points='15 18 9 12 15 6' />
					</svg>
				</button>

				<ul
					className='other__list'
					ref={listRef}
					tabIndex={0}
					aria-label='Other noteworthy projects (use arrow keys to navigate)'
				>
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

				<button
					type='button'
					className='other__navBtn other__navBtn--next'
					onClick={() => scrollByCard(1)}
					disabled={!canScrollNext}
					aria-label='Scroll to next projects'
				>
					<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
						<polyline points='9 18 15 12 9 6' />
					</svg>
				</button>
			</div>

			<span className='sectiontag sectiontag--close' aria-hidden='true' />
		</section>
	);
};

export default OtherProjects;
