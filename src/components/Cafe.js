import React from 'react';

import { Redirect } from 'react-router-dom';
import PropsRoute from '../components/PropsRoute';

import MainContainer from '../components/MainContainer';
import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContent from '../components/MainContent';

import CafeCategory from '../components/CafeCategory';

class Cafe extends React.Component {
	constructor() {
		super();
		this.renderCategoryRoute = this.renderCategoryRoute;
	}

	renderCategoryRoute = (category, i) => {
		const { match } = this.props;

		return (
			<PropsRoute
				key={i}
				name={category.name}
				path={`${match.url}/${category.name}`}
				component={CafeCategory}
				category={category}
				items={this.props.items}
			/>
		)
	}

	render() {
		const { match } = this.props;

		return (
			<main id="cafe" className="main">
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

export default Cafe;
