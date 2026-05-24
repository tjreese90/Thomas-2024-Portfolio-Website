import './leftSidebar.scss';

const LeftSideBar = () => (
	<aside className='left' aria-label='Social links'>
		<div className='left__main'>
			<ul className='left__social'>
				<li className='left__linkItems'>
					<a
						href='https://www.tradingview.com/u/ThomasTradingAlgo/#published-scripts'
						className='left__links'
						target='_blank'
						rel='noreferrer'
						aria-label='TradingView profile'
					>
						<svg className='left__icon' aria-hidden='true'>
							<use href='icons/symbol-defs.svg#icon-tradingview' />
						</svg>
					</a>
				</li>
				<li className='left__linkItems'>
					<a
						href='https://codepen.io/tjreese90'
						className='left__links'
						target='_blank'
						rel='noreferrer'
						aria-label='CodePen profile'
					>
						<svg className='left__icon' aria-hidden='true'>
							<use href='/icons/symbol-defs.svg#icon-codepen' />
						</svg>
					</a>
				</li>
				<li className='left__linkItems'>
					<a
						href='https://github.com/tjreese90'
						className='left__links'
						target='_blank'
						rel='noreferrer'
						aria-label='GitHub profile'
					>
						<svg className='left__icon' aria-hidden='true'>
							<use href='/icons/symbol-defs.svg#icon-github' />
						</svg>
					</a>
				</li>
				<li className='left__linkItems'>
					<a
						href='https://www.instagram.com/tjreese90'
						className='left__links'
						target='_blank'
						rel='noreferrer'
						aria-label='Instagram profile'
					>
						<svg className='left__icon' aria-hidden='true'>
							<use href='/icons/symbol-defs.svg#icon-instagram' />
						</svg>
					</a>
				</li>
				<li className='left__linkItems'>
					<a
						href='https://www.linkedin.com/in/thomas-reese-541758142/'
						target='_blank'
						rel='noreferrer'
						className='left__links'
						aria-label='LinkedIn profile'
					>
						<svg className='left__icon' aria-hidden='true'>
							<use href='/icons/symbol-defs.svg#icon-linkedin' />
						</svg>
					</a>
				</li>
			</ul>
			<div className='left__line' />
		</div>
	</aside>
);

export default LeftSideBar;
