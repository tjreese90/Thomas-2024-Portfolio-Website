import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AnimatedLettersFast from '../AnimatedLettersFast/AnimatedLettersFast';
import './CommunityAndAchievements.scss';

const CommunityAndAchievements = () => {
	const [letterClass, setLetterClass] = useState('text-animate-fast');
	const nameArray = [...'04. Community Impact'];

	const TIMEOUT_DURATION = 4000;

	useEffect(() => {
		const timer = setTimeout(() => {
			setLetterClass('text-animate-fast-hover');
		}, TIMEOUT_DURATION);
		return () => clearTimeout(timer);
	}, []);

	return (
		<section
			className='community-achievements'
			id='community-achievements'
			aria-labelledby='community-achievements-heading'
		>
			<div className='community-achievements__left'>
				<span className='sectiontag'>&lt;section&gt;</span>
				<h1
					id='community-achievements-heading'
					className='community-achievements__headingPrimary'
				>
					<AnimatedLettersFast
						letterClass={letterClass}
						strArray={nameArray}
						idx={15}
					/>
				</h1>
				<div className='community-achievements__description'>
					<section>
						<h2 className='community-achievements__subheading'>
							Community Involvement
						</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
						<p>
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat.
						</p>
					</section>

					<section>
						<h2 className='community-achievements__subheading'>Achievements</h2>
						<div className='community-achievements__cards'>
							<article className='community-achievements__card'>
								<h3 className='community-achievements__cardTitle'>
									Achievement 1
								</h3>
								<p>
									Duis aute irure dolor in reprehenderit in voluptate velit esse
									cillum dolore eu fugiat nulla pariatur.
								</p>
							</article>
							<article className='community-achievements__card'>
								<h3 className='community-achievements__cardTitle'>
									Achievement 2
								</h3>
								<p>
									Excepteur sint occaecat cupidatat non proident, sunt in culpa
									qui officia deserunt mollit anim id est laborum.
								</p>
							</article>
						</div>
					</section>
				</div>
				<span className='sectiontag'>&lt;/section&gt;</span>
			</div>
		</section>
	);
};

CommunityAndAchievements.propTypes = {
	letterClass: PropTypes.string,
	nameArray: PropTypes.array,
};

export default CommunityAndAchievements;
