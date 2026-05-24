import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './navbar.scss';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const menuItems = useMemo(
		() => [
			{ id: '01.', name: 'About', link: '/#about' },
			{ id: '02.', name: 'Projects', link: '/#projects' },
			{ id: '03.', name: 'Work', link: '/#other-project' },
			{ id: '04.', name: 'Impact', link: '/#community-achievements' },
			{ id: '05.', name: 'My Journey', link: '/#my-journey' },
		],
		[],
	);

	const isActive = (hash: string) =>
		typeof window !== 'undefined' && window.location.hash === hash;

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
					{menuItems.map(({ id, name, link }) => (
						<li
							key={id}
							className={`navbar__items ${isActive(link) ? 'active' : ''}`}
						>
							<HashLink
								to={link}
								className='navbar__itemsLink'
								onClick={closeMenu}
							>
								<span className='navbar__itemsLinkNumeric'>{id}</span>
								{name}
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
