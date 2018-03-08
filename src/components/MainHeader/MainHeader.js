import React from 'react';
import { Container, Row } from '../../layouts/GridOld';
// import { NavLink } from '../components/Nav';
import { NavLink } from '../../components/Nav';

class MainHeader extends React.Component {
	constructor() {
		super();
		this.renderHeaderProfile = this.renderHeaderProfile.bind(this);
	}

	renderHeaderProfile = () => {
		const { 
			member,
			user,
			match,
			isAuthenticated,
			location
		} = this.props;

		if(isAuthenticated) {
			return (
				<div className="header-profile header__block">
					<NavLink to="/logout">Keluar</NavLink>
				</div>
			)
		}
	}

	render() {
		const {
			isAuthenticated,
			user
		} = this.props;

		if(isAuthenticated) {
			return (
				<header className="header main-header">
					<Container className="main-header__container">
						<div className="header-logo header__block">
							<h6 className="header__logo">Carwash 805</h6>
                            <h1>Hai</h1>
						</div>
						{ this.renderHeaderProfile() }
					</Container>
				</header>
			)
		}

		return null;
	}
}

export default MainHeader;
