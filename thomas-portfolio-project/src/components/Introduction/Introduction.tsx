import type { MouseEvent as ReactMouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { fadeUp, heroLetter, staggerParent } from '@lib/motion';
import './introduction.scss';

const HERO_NAME = "Hi, I'm Thomas.";
const HERO_ROLE = 'Full-Stack AI Engineer.';
const ROLE_LINE = 'AI Engineer at Envoy · RAG · MCP · Claude · React 19 · TypeScript · Python';
const ACCESSIBLE_HEADING = `${HERO_NAME} ${HERO_ROLE}`;
const MAGNET_RANGE = 8;        // max translation (px)
const MAGNET_RESPONSE = 0.22;  // % of cursor-offset that becomes translation

const Introduction = () => {
	const reduced = useReducedMotion();

	const nameLetters = [...HERO_NAME];
	const parent = reduced ? { hidden: {}, visible: {} } : staggerParent;
	const letter = reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : heroLetter;

	// Magnetic CTA — Get-in-touch button translates toward cursor (max 8px)
	const magnetX = useSpring(0, { stiffness: 150, damping: 15 });
	const magnetY = useSpring(0, { stiffness: 150, damping: 15 });

	const handleMagnet = (e: ReactMouseEvent<HTMLDivElement>) => {
		if (reduced) return;
		const r = e.currentTarget.getBoundingClientRect();
		const dx = e.clientX - (r.left + r.width / 2);
		const dy = e.clientY - (r.top + r.height / 2);
		magnetX.set(Math.max(-MAGNET_RANGE, Math.min(MAGNET_RANGE, dx * MAGNET_RESPONSE)));
		magnetY.set(Math.max(-MAGNET_RANGE, Math.min(MAGNET_RANGE, dy * MAGNET_RESPONSE)));
	};
	const resetMagnet = () => {
		magnetX.set(0);
		magnetY.set(0);
	};

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
					aria-label={ACCESSIBLE_HEADING}
				>
					<span className='intro__name' aria-hidden='true'>
						{nameLetters.map((ch, i) => (
							<motion.span
								key={i}
								className='intro__letter'
								variants={letter}
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
						aria-hidden='true'
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
					className='intro__badge'
					variants={fadeUp}
					initial='hidden'
					animate='visible'
					transition={{ delay: 0.78 }}
					role='status'
					aria-label='Currently building production AI: RAG, MCP, and Claude Agents at Envoy'
				>
					<span className='intro__badgeDot' aria-hidden='true' />
					<span className='intro__badgeLabel'>
						<span className='intro__badgePrefix'>Currently building</span>
						<span className='intro__badgeText'>
							Production AI · RAG · MCP · Claude Agents @ Envoy
						</span>
					</span>
				</motion.div>
				<motion.div
					className='intro__cta'
					variants={fadeUp}
					initial='hidden'
					animate='visible'
					transition={{ delay: 0.95 }}
					style={{ x: magnetX, y: magnetY }}
					onMouseMove={handleMagnet}
					onMouseLeave={resetMagnet}
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
