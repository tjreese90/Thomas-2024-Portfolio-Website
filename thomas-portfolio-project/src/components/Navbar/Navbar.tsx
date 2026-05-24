import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './navbar.scss';

const Navbar = () => {
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

	const isActive = (hash: any) => window.location.hash === hash;

	return (
		<nav className='navbar'>
			<div className='navbar__left'>
				<Link to='/' className='navbar__link' aria-label='Thomas Reese — Home'>
					<img
						alt=''
						aria-hidden='true'
						src='https://img.icons8.com/?size=100&id=n1oME711GbEH&format=png&color=000000'
						className='navbar__img'
					/>
				</Link>
			</div>
			<div className='navbar__right'>
				<ul className='navbar__list'>
					{menuItems.map(({ id, name, link }) => (
						<li
							key={id}
							className={`navbar__items ${isActive(link) ? 'active' : ''}`}
						>
							<HashLink to={link} className='navbar__itemsLink'>
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
				>
					Resume
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
