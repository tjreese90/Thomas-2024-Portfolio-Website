import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import AnimatedLettersFast from '../AnimatedLettersFast/AnimatedLettersFast';
import './about.scss';

const TIMEOUT_DURATION = 4000;
const DOUBLE_TAP_TIMEOUT = 300; // Time window for detecting a double tap

const paragraphVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: 'easeInOut' },
	},
};

const skillsContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, ease: 'easeInOut' },
	},
};

const skillsItemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: 'easeInOut' },
	},
	whileHover: {
		scale: 1.05,
		rotate: 2,
		color: '#ff8c00',
		transition: { type: 'spring', stiffness: 200, damping: 10 },
	},
};

// Define type for constraints
interface DragConstraints {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

const About = () => {
	const [letterClass, setLetterClass] = useState('text-animate-fast');
	const [speedMode, setSpeedMode] = useState(0);
	const [lastTap, setLastTap] = useState(0); // Store time of last tap
	const rotateX = useMotionValue(0);
	const rotateY = useMotionValue(0);
	const dragX = useMotionValue(0);
	const dragY = useMotionValue(0);

	// Create a ref for the container to limit dragging area
	const cubeContainerRef = useRef<HTMLDivElement | null>(null); // Correct typing
	const [constraints, setConstraints] = useState<DragConstraints | null>(null); // Use the DragConstraints type

	// Store initial values for reset purposes
	const initialPosition = { x: 0, y: 0 };
	const initialSpeed = 8; // Initial speed

	const nameArray = [...'01. About Me'];
	const skillsArray = [
		'JavaScript (ES6+) & Babel',
		'TypeScript / Flow',
		'HTML5 & CSS3 & XML',
		'React.js & Redux & RTK',
		'Node.js & Express.js',
		'MongoDB & SQL',
		'GraphQL & REST APIs',
		'Docker & Kubernetes',
		'AWS & GCP',
		'Git & GitHub & Xcode',
		'CircleCI & Webpack',
		'Tailwind CSS & Bootstrap & Material UI',
		'Jest & Cypress Testing & Enzyme',
		'Figma Dev & Adobe XD',
		'Netlify & Heroku & Vercel',
		'Next.js & Vite.js',
		'Three.js & D3.js',
		'Angular & Vue.js',
		'Scrum & Agile Development',
		'WebGL & Blender',
		'Ruby & Ruby on Rails',
		'Java & C#',
		'Python & Pandas.py',
		'PineScript & MQL5',
	];

	useEffect(() => {
		const timer = setTimeout(
			() => setLetterClass('text-animate-fast-hover'),
			TIMEOUT_DURATION,
		);
		return () => clearTimeout(timer);
	}, []);

	// Function to toggle between different spin speeds
	const toggleSpeed = () => {
		setSpeedMode((prevMode) => (prevMode + 1) % 5); // Cycle through 5 speed modes
	};

	// Determine speed based on the current mode (faster speeds with each click)
	const getSpinDuration = () => {
		switch (speedMode) {
			case 0:
				return initialSpeed; // Slowest speed (initial)
			case 1:
				return 6;
			case 2:
				return 4;
			case 3:
				return 2;
			case 4:
				return 1; // Fastest speed
			default:
				return initialSpeed;
		}
	};

	// Function to handle double-tap and reset the cube
	const handleDoubleTap = () => {
		// Reset cube position and speed
		dragX.set(initialPosition.x);
		dragY.set(initialPosition.y);
		setSpeedMode(0); // Reset speed to the initial value
	};

	// Detect double tap using click events
	const handleTap = () => {
		const currentTime = new Date().getTime();
		const tapInterval = currentTime - lastTap;

		if (tapInterval < DOUBLE_TAP_TIMEOUT && tapInterval > 0) {
			handleDoubleTap();
		}

		setLastTap(currentTime); // Update last tap time
	};

	// Set larger drag constraints
	useEffect(() => {
		if (cubeContainerRef.current) {
			const container = cubeContainerRef.current.getBoundingClientRect();
			const buffer = 100; // Allow extra movement beyond the container
			setConstraints({
				top: -buffer,
				bottom: container.height - 100 + buffer, // Cube height is considered
				left: -buffer,
				right: container.width - 100 + buffer, // Cube width is considered
			});
		}
	}, [cubeContainerRef]);

	return (
		<section
			className='about'
			id='about'
			aria-labelledby='about-heading'
			onClick={handleTap} // Detect double tap on the whole section
		>
			<div className='about__left'>
				<span className='sectiontag'>&lt;section&gt;</span>
				<h1 id='about-heading' className='about__headingPrimary'>
					<AnimatedLettersFast
						letterClass={letterClass}
						strArray={nameArray}
						idx={15}
					/>
				</h1>
				<div className='about__description'>
					{[
						'Hello! My name is Thomas Reese, a Front-End Developer based in Lisle, Illinois. I am passionate about creating intuitive and dynamic user experiences.',
						'I graduated from Dominican University in 2022 with a Bachelor of Science in Computer Science. My coursework included OOP, Data Structures, and AI.',
						'I have worked as an Infrastructure Engineer and Front-End Developer Intern at Credit Karma and a Front-End Web Developer at Sprout Social.',
						'Here are some of the technologies I have been working with recently:',
					].map((text, idx) => (
						<motion.p
							key={idx}
							initial='hidden'
							animate='visible'
							variants={paragraphVariants}
							transition={{ delay: idx * 0.2 }}
						>
							{text}
						</motion.p>
					))}

					<motion.ul
						className='about__skillsList'
						initial='hidden'
						animate='visible'
						variants={skillsContainerVariants}
					>
						{skillsArray.map((skill, index) => (
							<motion.li
								key={index}
								className='about__skillsItems'
								variants={skillsItemVariants}
								whileHover='whileHover'
							>
								{skill}
							</motion.li>
						))}
					</motion.ul>
				</div>
				<span className='sectiontag'>&lt;/section&gt;</span>
			</div>
			<div className='about__right'>
				{/* Cube Spinner */}
				<div
					className='cube-drag-container'
					ref={cubeContainerRef}
					style={{ width: '100%', height: '100%', position: 'relative' }}
				>
					{constraints && (
						<motion.div
							className='stage-cube-cont'
							drag
							dragElastic={0.2}
							dragConstraints={constraints} // Limit drag with looser constraints
							style={{
								rotateX,
								rotateY,
								x: dragX,
								y: dragY,
							}}
							onClick={toggleSpeed} // Change speed on click
							animate={{
								rotateX: [0, 360],
								rotateY: [0, 360],
							}}
							transition={{
								duration: getSpinDuration(),
								ease: 'easeInOut',
								repeat: Infinity,
								repeatType: 'loop',
							}}
						>
							<div className='cubespinner'>
								{[
									'python',
									'css3',
									'javascript',
									'mongodb',
									'node-dot-js',
									'react',
								].map((icon, index) => (
									<div className={`face${index + 1}`} key={icon}>
										<svg className='about__icon'>
											<use xlinkHref={`icons/symbol-defs.svg#icon-${icon}`} />
										</svg>
									</div>
								))}
							</div>
						</motion.div>
					)}
				</div>
			</div>
		</section>
	);
};

export default About;
