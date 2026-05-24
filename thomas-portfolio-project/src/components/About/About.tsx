import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useReducedMotion } from 'framer-motion';
import './about.scss';

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
	const reduced = useReducedMotion();
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

	const skillsArray = [
		'TypeScript & React 19',
		'Ruby on Rails',
		'Ember.js (Octane / Glimmer)',
		'Python & FastAPI',
		'AWS Bedrock & S3 Vectors',
		'Model Context Protocol (MCP)',
		'Anthropic Claude SDK',
		'Pulumi & Terraform',
		'Kubernetes & Docker',
		'PostgreSQL & Redis & Kafka',
		'Module Federation (Webpack 5)',
		'TanStack Query v5',
		'Tailwind & Radix UI',
		'Cerbos Authorization',
		'OpenTelemetry & Datadog',
		'Vitest & RSpec & Playwright',
		'MSW v2 & Mocking',
		'Graphite (Stacked PRs)',
		'Next.js & Vite',
		'Node.js & Express',
		'GraphQL & REST APIs',
		'OANDA API & PineScript',
		'Three.js & Framer Motion',
		'Figma',
	];

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
				<h2 id='about-heading' className='about__headingPrimary'>
					<span className='about__sectionNumber'>01.</span> About Me
				</h2>
				<div className='about__description'>
					{[
						'Hello! My name is Thomas Reese, a Full-Stack Developer based in Oakland, California. I build production systems where AI agents, scalable web apps, and developer tooling intersect.',
						'I currently work as a Software Engineer at Envoy, where I built a Codebase Intelligence platform end-to-end: Amazon S3 Vectors infrastructure on AWS (Pulumi/Terraform), an Amazon Bedrock Knowledge Bases store using Titan Text Embeddings V2, and a Python MCP server exposing six retrieval tools to Anthropic Claude via the Model Context Protocol. The system indexes 22 internal repositories (~87,500 Tree-sitter AST chunks) with top-1 retrieval averaging 0.785 at ~$0.03/month, replacing per-engineer 6–8 GB local vector databases.',
						"I led the migration of Envoy's visitor-management dashboard from Ember.js/Glimmer to React 19 using Module Federation 2.0, and have shipped 337 merged pull requests across nine internal repos in 18 months on a stacked-PR (Graphite) workflow. Customers I've shipped fixes for include Blue Origin, Tesla, and NVIDIA.",
						'Before Envoy, I was a Front-End Web Developer at Sprout Social. Earlier in my career, I worked as a Software Engineering Intern at The Walt Disney Company and as an Infrastructure Engineer / QA Intern at Credit Karma. I graduated from Dominican University in 2022 with a Bachelor of Science in Computer Science.',
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
							drag={!reduced}
							dragElastic={0.2}
							dragConstraints={constraints}
							style={{
								rotateX,
								rotateY,
								x: dragX,
								y: dragY,
							}}
							onClick={toggleSpeed}
							animate={reduced ? undefined : {
								rotateX: [0, 360],
								rotateY: [0, 360],
							}}
							transition={reduced ? undefined : {
								duration: getSpinDuration(),
								ease: 'easeInOut',
								repeat: Infinity,
								repeatType: 'loop',
							}}
							aria-label='Rotating tech stack cube — click to change speed, drag to move'
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
