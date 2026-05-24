import type { Variants } from 'framer-motion';

// Single shared variant for all entrance reveals — applied consistently across
// sections reads more senior than five bespoke per-section animations.
export const fadeUp: Variants = {
	hidden: { y: 24, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
	},
};

export const staggerParent: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.05 } },
};

export const heroLetter: Variants = {
	hidden: { y: 16, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
	},
};

export const reducedFade: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0 } },
};
