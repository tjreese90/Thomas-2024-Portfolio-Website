import Introduction from '../../components/Introduction/Introduction';
import './center.scss';
import About from '@components/About/About';
import Project from '@components/Projects/Projects';
import OtherProjects from '@components/OtherProjects/OtherProjects';
import Touch from '@components/Touch/Touch';
import CommunityAndAchievements from '@components/CommunityAchievments/CommunityAndAchievements';

const Center = () => (
	<div>
		<span className='tag'>&lt;body&gt;</span>
		<Introduction />
		<About />
		<Touch />
		<Project />
		<OtherProjects />
		<CommunityAndAchievements />
		<span className='tag'>&lt;/body&gt;</span>
	</div>
);

export default Center;
