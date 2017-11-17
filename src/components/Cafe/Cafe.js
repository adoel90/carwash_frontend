import React from 'react';

import { Redirect } from 'react-router-dom';
import { Container, Row } from '../Grid';
import { PropsRoute } from '../Route';

import MainSidenav from '../MainSidenav';

import CafeTypeContainer from '../../containers/CafeTypeContainer';

class Cafe extends React.Component {
	constructor() {
		super();
		this.handleSidenav = this.handleSidenav.bind(this);
		this.renderCafeTypeContent = this.renderCafeTypeContent.bind(this)
	}

	renderCafeTypeContent = (type, i) => {
		const {
			match
		} = this.props;

		let path = type.name.replace(/\s+/g, '-').toLowerCase();

		return (
			<PropsRoute
				key={i}
				name={type.name}
				path={`${match.url}/${path}`}
				component={CafeTypeContainer}
				type={type}
				{...this.props}
			/>
		)
	}

	handleSidenav = () => {
		const {
			cafe,
			cafeTypes,
			match
		} = this.props;

		if(cafe.isLoaded) {
			return <MainSidenav items={cafeTypes} basePath={match.path} />
		}
	}

	render() {
		const {
			match,
			cafe,
			cafeTypes
		} = this.props;

		let firstRoutePath;

		if(cafe.isLoaded) {
			firstRoutePath = cafeTypes[0].name.replace(/\s+/g, '-').toLowerCase();
		}

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3 padding-bottom-3">
					<Row>
						<div className="column-2">
							<aside className="sidebar">
								{ this.handleSidenav() }
							</aside>
						</div>
						<div className="column-10">
							{ cafe.isLoaded ? cafeTypes.map(this.renderCafeTypeContent) : null }
							<Redirect from="/*"	 to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
			</main>
		)

		// return (
		// 	<main className="main main--has-subheader">
		// 		<Container className="padding-top-3">
		// 			<Row>
		// 				<div className="column-2">
		// 					<aside className="sidebar">
		// 						{ cafeTypes.length
		// 							? <MainSidenav items={ cafeTypes.length ? cafeTypes : null } basePath={match.path} />
		// 							: null }
		// 					</aside>
		// 				</div>
		// 				<div className="column-10">
		// 					{ cafeTypes.length ? cafeTypes.map(this.renderCafeType) : null }
		// 					<Redirect from="/*"	 to={`${match.url}/${firstRoutePath}`} />
		// 				</div>
		// 			</Row>
		// 		</Container>
		// 	</main>
		// )
	}
}


export default Cafe;




// class Cafe extends React.Component {
// 	constructor() {
// 		super();
// 		this.renderCafeType = this.renderCafeType.bind(this);
// 	}
//
// 	renderCafeType = (type, i) => {
// 		const { match } = this.props;
// 		const path = type.name.replace(/\s+/g, '-').toLowerCase();
// 		console.log(type);
//
// 		return (
// 			<PropsRoute
// 				key={i}
// 				name={type.name}
// 				path={`${match.url}/${path}`}
// 				component={CafeTypeContainer}
// 				type={type}
// 				{...this.props}
// 			/>
// 		)
// 	}
//
// 	render() {
// 		const {
// 			match,
// 			cafe,
// 			cafeTypes
// 		} = this.props;
//
// 		let firstRoutePath;
//
// 		if(cafeTypes.length) {
// 			firstRoutePath = cafeTypes[0].name.replace(/\s+/g, '-').toLowerCase();
// 		}
//
// 		return (
// 			<main className="main main--has-subheader">
// 				<Container className="padding-top-3">
// 					<Row>
// 						<div className="column-2">
// 							<aside className="sidebar">
// 								{ cafeTypes.length
// 									? <MainSidenav items={ cafeTypes.length ? cafeTypes : null } basePath={match.path} />
// 									: null }
// 							</aside>
// 						</div>
// 						<div className="column-10">
// 							{ cafeTypes.length ? cafeTypes.map(this.renderCafeType) : null }
// 							<Redirect from="/*"	 to={`${match.url}/${firstRoutePath}`} />
// 						</div>
// 					</Row>
// 				</Container>
// 			</main>
// 		)
// 	}
// }
