//CommunityAndAchievements.tsx
import { useEffect, useState } from 'react';
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
							For over two years, I have been volunteering with{' '}
							<a
								href='https://codenation.org/'
								target='_blank'
								rel='noreferrer'
								className='highlight-link'
							>
								Code Nation
							</a>
							, where I teach students about STEM roles and careers, and help
							them learn coding. It has been incredibly rewarding to see young
							minds light up as they discover their potential in technology.
						</p>
						<p>
							I have also participated in various hackathons, such as{' '}
							<a
								href='https://careers.jpmorgan.com/us/en/students/programs/tfsg-hackathons'
								target='_blank'
								rel='noreferrer'
								className='highlight-link'
							>
								JP Morgan's 24HR Code For Good hackathon
							</a>
							, where I led a front-end team to create a dynamic website for a
							non-profit called Girls in the Game. This platform encourages
							young females to engage in sports by providing a friendly place to
							discuss sports-related activities.
						</p>
						<p>
							In addition, I took part in{' '}
							<a
								href='https://codenation.org/recap-code-nation-new-york-hackathon-2023/'
								target='_blank'
								rel='noreferrer'
								className='highlight-link'
							>
								Google's Code Nation Hackathon
							</a>
							, where I guided students in local schools to use HTML, CSS, and
							JavaScript to create websites showcasing their passions. This
							experience was a fantastic opportunity to give back to the
							community and inspire the next generation of developers.
						</p>
						<p>
							Moreover, I have volunteered at the{' '}
							<span className='highlight'>
								Disabled Children's Lighthouse of Chicago
							</span>{' '}
							and <span className='highlight'>Open Hands</span>, helping feed
							the hungry and those in need. These experiences have deepened my
							commitment to community service and social responsibility.
						</p>
					</section>

					<section>
						<h2 className='community-achievements__subheading'>Achievements</h2>
						<div className='community-achievements__cards'>
							<article className='community-achievements__card'>
								<h3 className='community-achievements__cardTitle'>
									ACCA Coding Competition
								</h3>
								<p>
									Participated in the{' '}
									<a
										href='https://www.trnty.edu/academic-program/computing/above-beyond/trollgamers-rank-in-top-5-of-acca-competition/'
										target='_blank'
										rel='noreferrer'
										className='highlight-link'
									>
										Associated Colleges of the Chicago Area (ACCA) competition
									</a>
									, where my team secured second place by solving complex
									algorithms and showcasing our coding prowess.
								</p>
							</article>
							<article className='community-achievements__card'>
								<h3 className='community-achievements__cardTitle'>
									Credit Karma Commercial
								</h3>
								<p>
									Featured in a commercial for{' '}
									<span className='highlight'>Credit Karma</span> to share my
									credit journey story, which highlighted the impact of their
									services on my financial well-being. Link will be added later.
								</p>
							</article>
							<article className='community-achievements__card'>
								<h3 className='community-achievements__cardTitle'>
									JumpStart Commercial
								</h3>
								<p>
									Participated in a commercial for{' '}
									<span className='highlight'>JumpStart</span>, a company aiding
									college students in finding internships and jobs. The
									commercial was part of their rebranding efforts. Link will be
									added later.
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
