import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.scss';

const ScrollToTopButton: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);
		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	return (
		<div className='scroll-to-top'>
			<button
				onClick={scrollToTop}
				type='button'
				aria-label='Scroll to top of page'
				className={`scroll-to-top__button ${
					isVisible ? 'scroll-to-top__button--visible' : ''
				}`}
			>
				<span aria-hidden='true'>↑</span>
			</button>
		</div>
	);
};

export default ScrollToTopButton;
