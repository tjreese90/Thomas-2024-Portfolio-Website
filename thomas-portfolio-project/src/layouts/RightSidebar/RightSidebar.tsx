import React from 'react';
import { Link } from 'react-router-dom';
import './rightSidebar.scss';

const RightSideBar = () => (
	<aside className='right' aria-label='Contact email'>
		<div className='right__main'>
			<div>
				<Link to='/contact' className='right__email'>
					ThomasReeseCareers@gmail.com
				</Link>
			</div>
			<div className='right__line' />
		</div>
	</aside>
);

export default RightSideBar;
