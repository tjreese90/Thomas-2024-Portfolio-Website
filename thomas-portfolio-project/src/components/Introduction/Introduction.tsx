import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, heroLetter, staggerParent } from '@lib/motion';
import './introduction.scss';

const HERO_NAME = "Hi, I'm Thomas.";
const HERO_ROLE = 'Full-Stack Software Engineer.';
const ROLE_LINE = 'Software Engineer at Envoy · React, TypeScript, Rails, Python, MCP';

const Introduction = () => {
	const reduced = useReducedMotion();

	const nameLetters = [...HERO_NAME];
	const parent = reduced ? { hidden: {}, visible: {} } : staggerParent;
	const letter = reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : heroLetter;

	return (
		<section className='intro' aria-labelledby='hero-heading'>
			<div className='intro__left'>
				<span className='sectiontag'>&lt;section&gt;</span>
				<motion.h1
					id='hero-heading'
					className='intro__headingPrimary'
					variants={parent}
					initial='hidden'
					animate='visible'
				>
					<span className='intro__name' aria-label={HERO_NAME}>
						{nameLetters.map((ch, i) => (
							<motion.span
								key={i}
								className='intro__letter'
								variants={letter}
								aria-hidden='true'
							>
								{ch === ' ' ? ' ' : ch}
							</motion.span>
						))}
					</span>
					<motion.span
						className='intro__headingPrimaryRole'
						variants={fadeUp}
						initial='hidden'
						animate='visible'
						transition={{ delay: 0.45 }}
					>
						{HERO_ROLE}
					</motion.span>
				</motion.h1>
				<motion.p
					className='intro__headingSecondary'
					variants={fadeUp}
					initial='hidden'
					animate='visible'
					transition={{ delay: 0.7 }}
				>
					{ROLE_LINE}
				</motion.p>
				<motion.div
					variants={fadeUp}
					initial='hidden'
					animate='visible'
					transition={{ delay: 0.85 }}
				>
					<Link to='/contact' className='intro__button'>
						Get in touch
					</Link>
				</motion.div>
				<span className='sectiontag'>&lt;/section&gt;</span>
			</div>
			<div className='intro__right' aria-hidden='true'>
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
		</section>
	);
};

export default Introduction;
