import './leftSidebar.scss';

const LeftSideBar = () => (
	<div className='left'>
		<main className='left__main'>
			<ul className='left__social'>
				<li className='left__linkItems'>
					<a
						href='https://www.youtube.com/channel/UCax8or2_bzQCHe0GdSLITOA'
						className='left__links'
						target='_blank'
						rel='noreferrer'
					>
						<svg className='left__icon'>
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
					>
						<svg className='left__icon'>
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
					>
						<svg className='left__icon'>
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
					>
						<svg className='left__icon'>
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
					>
						<svg className='left__icon'>
							<use href='/icons/symbol-defs.svg#icon-linkedin' />
						</svg>
					</a>
				</li>
			</ul>
			<div className='left__line' />
		</main>
	</div>
);

export default LeftSideBar;
