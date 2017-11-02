import React from 'react';
import { Container, Row } from '../components/Grid';
import NavLink from '../components/NavLink';

class MainHeader extends React.Component {
	render() {
		const {
			isAuthenticated,
			user
		} = this.props;

		return (
			<header className="header main-header">
				<Container>
					<Row className="flex justify-content--space-between clr-light">
						<div className="header__block column-auto justify-content--flex-start">
							<h6 className="tt-uppercase fw-bold ls-base">Carwash 805</h6>
						</div>
						<div className="header__block column-auto justify-content--flex-end">
							{
								isAuthenticated
									? <NavLink to="/logout">Keluar</NavLink>
									: null
							}

							{/* <a onClick={this.logout()}>Logout</a> */}
						</div>
					</Row>
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
