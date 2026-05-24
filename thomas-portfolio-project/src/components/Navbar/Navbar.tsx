import { useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './navbar.scss';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState<string>('');

	const menuItems = useMemo(
		() => [
			{ id: '01.', name: 'About', link: '/#about', anchor: 'about' },
			{ id: '02.', name: 'Experience', link: '/#experience', anchor: 'experience' },
			{ id: '03.', name: 'Projects', link: '/#projects', anchor: 'projects' },
			{ id: '04.', name: 'Impact', link: '/#community-achievements', anchor: 'community-achievements' },
			{ id: '05.', name: 'Contact', link: '/contact', anchor: '' },
		],
		[],
	);

	// Highlight the nav item whose section is currently in view
	useEffect(() => {
		const sections = menuItems
			.filter((m) => m.anchor)
			.map((m) => document.getElementById(m.anchor))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0) return;
		const io = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting);
				if (visible.length > 0) {
					visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
					setActiveSection(visible[0].target.id);
				}
			},
			{ rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
		);
		sections.forEach((s) => io.observe(s));
		return () => io.disconnect();
	}, [menuItems]);

	const isActive = (item: { anchor: string }) => item.anchor && activeSection === item.anchor;

	// Close on Escape, lock body scroll when open on mobile
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setMenuOpen(false);
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, []);

	useEffect(() => {
		document.body.classList.toggle('nav-open', menuOpen);
		return () => document.body.classList.remove('nav-open');
	}, [menuOpen]);

	const closeMenu = () => setMenuOpen(false);

	return (
		<nav className='navbar' aria-label='Primary'>
			<div className='navbar__left'>
				<Link
					to='/'
					className='navbar__link'
					aria-label='Thomas Reese — Home'
					onClick={closeMenu}
				>
					<img
						alt=''
						aria-hidden='true'
						src='https://img.icons8.com/?size=100&id=n1oME711GbEH&format=png&color=000000'
						className='navbar__img'
					/>
				</Link>
			</div>

			<button
				type='button'
				className={`navbar__hamburger ${menuOpen ? 'is-open' : ''}`}
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				aria-expanded={menuOpen}
				aria-controls='primary-nav'
				onClick={() => setMenuOpen((o) => !o)}
			>
				<span aria-hidden='true' />
				<span aria-hidden='true' />
				<span aria-hidden='true' />
			</button>

			<div
				id='primary-nav'
				className={`navbar__right ${menuOpen ? 'is-open' : ''}`}
			>
				<ul className='navbar__list'>
					{menuItems.map((item) => (
						<li
							key={item.id}
							className={`navbar__items ${isActive(item) ? 'active' : ''}`}
						>
							<HashLink
								to={item.link}
								className={`navbar__itemsLink ${isActive(item) ? 'is-active' : ''}`}
								aria-current={isActive(item) ? 'location' : undefined}
								onClick={closeMenu}
							>
								<span className='navbar__itemsLinkNumeric'>{item.id}</span>
								{item.name}
							</HashLink>
						</li>
					))}
				</ul>
				<a
					href='/resume.pdf'
					target='_blank'
					rel='noreferrer'
					className='navbar__button'
					onClick={closeMenu}
				>
					Resume
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
