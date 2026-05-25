import { useState } from 'react';
import PropTypes from 'prop-types';
import './CommunityAndAchievements.scss';

type VideoKey = 'creditKarma';

const CommunityAndAchievements = () => {
	const [playingVideo, setPlayingVideo] = useState<Record<VideoKey, boolean>>({
		creditKarma: false,
	});

	const playVideo = (key: VideoKey) =>
		setPlayingVideo((prev) => ({ ...prev, [key]: true }));

	const renderVideo = (key: VideoKey, videoId: string, title: string) => {
		if (playingVideo[key]) {
			return (
				<iframe
					width='100%'
					height='315'
					src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
					title={title}
					frameBorder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowFullScreen
				/>
			);
		}
		return (
			<button
				type='button'
				className='community-achievements__videoPoster'
				onClick={() => playVideo(key)}
				aria-label={`Play video: ${title}`}
			>
				<img
					src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
					alt={title}
					loading='lazy'
				/>
				<span className='community-achievements__playIcon' aria-hidden='true'>
					▶
				</span>
			</button>
		);
	};


	return (
		<section
			className='community-achievements'
			id='community-achievements'
			aria-labelledby='community-achievements-heading'
		>
			<div className='community-achievements__left'>
				<span className='sectiontag' data-tag='<section>' aria-hidden='true' />
				<h2
					id='community-achievements-heading'
					className='community-achievements__headingPrimary'
				>
					<span className='about__sectionNumber'>04.</span> Community Impact
				</h2>
				<div className='community-achievements__description'>
					<section>
						<h3 className='community-achievements__subheading'>
							Community Involvement
						</h3>
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
							, where I led a front-end team to build a dynamic website for the
							non-profit Girls in the Game. The platform encourages women and
							girls to participate in sports by providing a community space for
							discussion and discovery.
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
								<a
									href='https://chicagolighthouse.org/patients-clients/multi-disabled/'
									target='_blank'
									className='highlight'
								>
									Disabled Children's Lighthouse of Chicago
								</a>
							</span>{' '}
							and{' '}
							<span className='highlight'>
								{' '}
								<a
									href='https://www.highstreetunited.org/open-hands-free-pantry.html'
									target='_blank'
									className='highlight'
								>
									Project Open Hands
								</a>
							</span>
							, helping feed the hungry and those in need. These experiences
							have deepened my commitment to community service and social
							responsibility.
						</p>
					</section>

					<section>
						<h3 className='community-achievements__subheading'>Achievements</h3>
						<div className='community-achievements__cards'>
							<article className='community-achievements__card'>
								<h4 className='community-achievements__cardTitle'>
									Google's Code Nation Hackathon
								</h4>
								<p>
									Mentored at{' '}
									<a
										href='https://codenation.org/recap-code-nation-new-york-hackathon-2023/'
										target='_blank'
										rel='noreferrer'
										className='highlight-link'
									>
										Google's Code Nation Hackathon
									</a>
									, guiding local high-school students through a day-long
									coding sprint where they built real websites in HTML, CSS,
									and JavaScript showcasing causes and passions they chose
									themselves.
								</p>
								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: '100%',
										margin: '20px 0',
									}}
								>
									<img
										src='./codenation.jpg'
										alt='Mentoring students at Google’s Code Nation Hackathon'
										className='community-achievements__image'
										style={{
											width: '45%',
											height: 'auto',
											objectFit: 'cover',
											borderRadius: '8px',
											boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
										}}
									/>
								</div>
							</article>

							<article className='community-achievements__card'>
								<h4 className='community-achievements__cardTitle'>
									Credit Karma Commercial
								</h4>
								<p>
									Featured in a commercial for{' '}
									<span className='highlight'>
										{' '}
										<a
											href='https://www.creditkarma.com/about'
											target='_blank'
											rel='noreferrer'
											className='highlight-link'
										>
											Credit Karma
										</a>
									</span>{' '}
									to share my credit journey story, which highlighted the impact
									of their services on my financial well-being.
								</p>
								<div className='community-achievements__video'>
									{renderVideo(
										'creditKarma',
										'JFwQ4r3mtus',
										"TJ's credit comeback",
									)}
								</div>
							</article>

							<article className='community-achievements__card' id='jumpStart'>
								<h4 className='community-achievements__cardTitle'>
									JumpStart Commercial
								</h4>
								<p>
									Participated in a commercial for{' '}
									<span className='highlight'>
										{' '}
										<a
											href='https://medium.com/sequoia-capital/jumpstart-a-better-approach-to-early-career-recruiting-eb6abd849b5c'
											target='_blank'
											rel='noreferrer'
											className='highlight-link'
										>
											JumpStart
										</a>
									</span>
									, a company helping college students find internships and
									full-time jobs. The spot ran as part of their rebranding
									campaign.
								</p>
							</article>
						</div>
					</section>
				</div>
				<span className='sectiontag' data-tag='</section>' aria-hidden='true' />
			</div>
		</section>
	);
};

CommunityAndAchievements.propTypes = {
	letterClass: PropTypes.string,
	nameArray: PropTypes.array,
};

export default CommunityAndAchievements;
