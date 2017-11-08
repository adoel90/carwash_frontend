import React from 'react';
import { Container, Row } from '../components/Grid';
import { NavLink } from '../components/Nav';

class MainHeader extends React.Component {
	constructor() {
		super();
		this.renderHeaderProfile = this.renderHeaderProfile.bind(this);
	}

	renderHeaderProfile = () => {
		const { match, isAuthenticated } = this.props;

		if(isAuthenticated) {
			return (
				<div className="header-profile header__block">
					<NavLink to="/logout">Keluar</NavLink>
				</div>
			)
		}

		return null;
	}

	render() {
		const {
			isAuthenticated,
			user
		} = this.props;

		return (
			<header className="header main-header">
				<Container className="main-header__container">
					<div className="header-logo header__block">
						<h6 className="header__logo">Carwash 805</h6>
					</div>
					{ this.renderHeaderProfile() }

					{/* <Row className="flex justify-content--space-between clr-light">
						<div className="header__block column-auto justify-content--flex-start">
							<h6 className="tt-uppercase fw-bold ls-base">Carwash 805</h6>
						</div>
						<div className="header__block column-auto justify-content--flex-end">
							{
								isAuthenticated
									? <NavLink to="/logout">Keluar</NavLink>
									: null
							}
						</div>
					</Row> */}
				</Container>

				{/* <div className="header__container container">
					<div className="row">
						<div className="header__block column-3">
					<div className="header__logo">
					<span className="heading-6 tt-uppercase fw-bold ls-base">{ this.state.logoText }</span>
					</div>
						</div>
						<div className="header__block column-auto">
					<div className="header__user">

					</div>
						</div>
					</div>
				</div> */}
			</header>
		)
	}
}

export default MainHeader;
