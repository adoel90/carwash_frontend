import React from 'react';
import { Redirect } from 'react-router-dom';
import PropsRoute from '../components/PropsRoute';

import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContainer from '../components/MainContainer';
import MainContent from '../components/MainContent';

import SelfServiceCategory from '../components/SelfServiceCategory';
// import CarwashContainer from '../containers/CarwashContainer';

class SelfService extends React.Component {
	constructor() {
		super();
		this.renderCategoryRoute = this.renderCategoryRoute.bind(this);
	}

	renderCategoryRoute = (category, i) => {
		const { match } = this.props;

		return (
			<PropsRoute
				key={i}
				name={category.name}
				path={`${match.url}/${category.name}`}
				component={SelfServiceCategory}
				category={category}
				services={this.props.services}
			/>
		)
	};

	render() {
		const { match } = this.props;

		return (
			<main id="self-service" className="main">
				<MainContainer>
					<MainSidebar>
						<MainSidenav items={ this.props.categories } basePath={match.path} />
					</MainSidebar>
					<MainContent>
						{ this.props.categories.map(this.renderCategoryRoute) }
						<Redirect from="/*" to={`${match.url}/${this.props.categories[0].name}`} />
					</MainContent>
				</MainContainer>
			</main>
		)
	}
}

export default SelfService;
