import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedLetters from '@components/AnimatedLetters/AnimatedLetters';
import { TypeAnimation } from 'react-type-animation';
import './introduction.scss';

const TYPE_PHRASES = [
	'I build full-stack web apps',
	2800,
	'Software Engineer at Envoy',
	2800,
	'React + TypeScript specialist',
	2800,
	'Trading systems & AI agents',
	2800,
	'Mobile-first UI/UX developer',
	2800,
] as const

const PHRASE_FALLBACK =
	'I build full-stack web apps · Software Engineer at Envoy · React + TypeScript · Trading systems & AI agents · Mobile-first UI/UX'

const Introduction = () => {
	const [letterClass, setLetterClass] = useState('text-animate');
	const nameArray = [...'Thomas,'];
	const jobArray = [...'oftware Developer '];
	const [typePaused, setTypePaused] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setLetterClass('text-animate-hover');
		}, 4000);
	}, []);

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
				<h1 className='intro__headingPrimary' aria-label="Hi, I'm Thomas, Software Developer">
					<span className='intro__line' aria-hidden='true'>
						<span className={letterClass}>H</span>
						<span className={`${letterClass} _12`}>i,</span>
					</span>
					<span className='intro__line' aria-hidden='true'>
						<span className={`${letterClass} _13`}>I</span>
						<span className={`${letterClass} _14`}>'m</span>
						{' '}
						<AnimatedLetters
							letterClass={letterClass}
							strArray={nameArray}
							idx={25}
						/>
					</span>
					<span className='intro__line' aria-hidden='true'>
						<img
							src='https://res.cloudinary.com/dhbiouaym/image/upload/v1663667972/Portfolio/logo-s_fna9e6.png'
							className='intro__logos'
							alt=''
						/>
						<AnimatedLetters
							letterClass={letterClass}
							strArray={jobArray}
							idx={25}
						/>
					</span>
				</h1>
				<h2 className='intro__headingSecondary'>
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
					<button
						type='button'
						className='intro__typePauseToggle'
						onClick={() => setTypePaused((p) => !p)}
						aria-label={typePaused ? 'Resume animation' : 'Pause animation'}
						aria-pressed={typePaused}
					>
						<span aria-hidden='true'>{typePaused ? '▶' : '❚❚'}</span>
					</button>
				</h2>
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
