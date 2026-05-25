import { useEffect, useRef } from 'react';

// Cursor-tracked spotlight via CSS variables — no React re-renders.
// The mousemove handler writes --mx and --my (in px, relative to the
// element's top-left) to the element's inline style. The component's
// SCSS then uses those vars to position a radial gradient on a ::before
// pseudo-element. Respects prefers-reduced-motion.
export function useSpotlight<T extends HTMLElement>() {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;

		let raf = 0;
		const onMove = (e: MouseEvent) => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const r = el.getBoundingClientRect();
				el.style.setProperty('--mx', `${e.clientX - r.left}px`);
				el.style.setProperty('--my', `${e.clientY - r.top}px`);
			});
		};
		const onLeave = () => {
			cancelAnimationFrame(raf);
			el.style.removeProperty('--mx');
			el.style.removeProperty('--my');
		};

		el.addEventListener('mousemove', onMove);
		el.addEventListener('mouseleave', onLeave);
		return () => {
			cancelAnimationFrame(raf);
			el.removeEventListener('mousemove', onMove);
			el.removeEventListener('mouseleave', onLeave);
		};
	}, []);

	return ref;
}
