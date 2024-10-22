import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './navbar.scss';

const Navbar = () => (
	<nav className='navbar'>
		<div className='navbar__left'>
			<Link to='/' className='navbar__link'>
				<img
					alt='logo'
					src='https://img.icons8.com/?size=100&id=n1oME711GbEH&format=png&color=000000'
					className='navbar__img'
				/>
			</Link>
		</div>
		<div className='navbar__right'>
			<ul className='navbar__list'>
				<li className='navbar__items'>
					<HashLink to='/#about' className='navbar__itemsLink'>
						<span className='navbar__itemsLinkNumeric'>01.</span>
						About
					</HashLink>
				</li>
				<li className='navbar__items'>
					<HashLink to='/#projects' className='navbar__itemsLink'>
						<span className='navbar__itemsLinkNumeric'>02.</span>
						Projects
					</HashLink>
				</li>
				<li className='navbar__items'>
					<HashLink to='/#work' className='navbar__itemsLink'>
						<span className='navbar__itemsLinkNumeric'>03.</span>
						Work
					</HashLink>
				</li>
				<li className='navbar__items'>
					<HashLink to='/#community-achievements' className='navbar__itemsLink'>
						<span className='navbar__itemsLinkNumeric'>04.</span>
						Impact
					</HashLink>
				</li>
				<li className='navbar__items'>
					<HashLink to='/#my-journey' className='navbar__itemsLink'>
						<span className='navbar__itemsLinkNumeric'>05.</span>
						My Journey
					</HashLink>
				</li>
			</ul>
			<a
				href='https://drive.google.com/file/d/1Xxme-Q0HY299yebjTTyeKw7af02v-jCT/view?usp=drive_link'
				target='_blank'
				rel='noreferrer'
				className='navbar__button'
			>
				Resume
			</a>
		</div>
	</nav>
);

export default Navbar;
