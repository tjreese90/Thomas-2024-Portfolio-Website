import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import './introduction.scss';

const TYPE_PHRASES = [
	'Software Engineer at Envoy',
	2800,
	'I build full-stack web apps',
	2800,
	'React + TypeScript specialist',
	2800,
	'Trading systems & AI agents',
	2800,
	'Mobile-first UI/UX developer',
	2800,
] as const;

const PHRASE_FALLBACK = 'Software Engineer at Envoy';

const Introduction = () => {
	const [typePaused, setTypePaused] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined' || !window.matchMedia) return;
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const update = () => setPrefersReducedMotion(mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	}, []);

	const isAnimating = !typePaused && !prefersReducedMotion;

	return (
		<div className='intro'>
			<div className='intro__left'>
				<span className='sectiontag'>&lt;section&gt;</span>
				<h1 className='intro__headingPrimary'>
					Hi, I'm Thomas.
					<span className='intro__headingPrimaryRole'>
						Full-Stack Software Engineer.
					</span>
				</h1>
				<div className='intro__subheadingRow'>
					<p
						className='intro__headingSecondary'
						aria-live='polite'
					>
						{isAnimating ? (
							<TypeAnimation
								sequence={[...TYPE_PHRASES]}
								wrapper='span'
								speed={65}
								repeat={Infinity}
								cursor={false}
							/>
						) : (
							<span>{PHRASE_FALLBACK}</span>
						)}
					</p>
					<button
						type='button'
						className='intro__typePauseToggle'
						onClick={() => setTypePaused((p) => !p)}
						aria-label={typePaused ? 'Resume subtitle animation' : 'Pause subtitle animation'}
						aria-pressed={typePaused}
					>
						<svg
							viewBox='0 0 24 24'
							width='14'
							height='14'
							aria-hidden='true'
						>
							{typePaused ? (
								<path d='M8 5v14l11-7z' fill='currentColor' />
							) : (
								<>
									<rect x='6' y='5' width='4' height='14' fill='currentColor' />
									<rect x='14' y='5' width='4' height='14' fill='currentColor' />
								</>
							)}
						</svg>
					</button>
				</div>
				<Link to='/contact' className='intro__button'>
					Contact Me
				</Link>
				<span className='sectiontag'>&lt;/section&gt;</span>
			</div>
			<div className='intro__right'>
				<div className='logo__outline'>
					<svg
						id='star-outline'
						width='36rem'
						height='36.4rem'
						viewBox='0 0 299 295'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M149.5 2.5 L183.6 112.4 L296 112.4 L202.5 176.5 L236.6 286.5 L149.5 220.5 L62.4 286.5 L96.5 176.5 L3 112.4 L115.4 112.4 Z'
							stroke='#FFD700'
							strokeWidth='2'
						/>
					</svg>
				</div>
				<div className='logo__fill'>
					<svg
						width='36.1rem'
						height='36.1rem'
						viewBox='0 0 287 287'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M143.5 2 L176.1 110.4 L285 110.4 L195.5 173.5 L228.1 281.5 L143.5 217.5 L58.9 281.5 L91.5 173.5 L2 110.4 L110.9 110.4 Z'
							fill='#FFD700'
						/>
						<path
							d='M143.5 17 L172.1 118.4 L273 118.4 L190.5 172.5 L219.1 273.5 L143.5 211.5 L67.9 273.5 L96.5 172.5 L14 118.4 L115.9 118.4 Z'
							fill='#115173'
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Introduction;
