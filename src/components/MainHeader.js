import React from 'react';
import MainHeaderLogo from './MainHeaderLogo';
import MainHeaderNavigation from './MainHeaderNavigation';

class MainHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			logo: '805 Carwash',
			navigations: [
				{ name: 'Layanan Car Wash', link: '/services' },
				{ name: 'Profile', link: '/profile' }
			]
		}
	}

	render() {
		return (
			<header className="header">
				<div className="main-header">
					<div className="header__container container">
						<div className="row">
							<div className="header__block column-3">
								<MainHeaderLogo
									text={this.state.logo}
								/>
							</div>
							<div className="header__block column-auto">

							</div>
						</div>
					</div>
				</div>
				<div className="sub-header">
					<div className="header__container container">
						<MainHeaderNavigation
							navigations={this.state.navigations}
						/>
					</div>
				</div>
			</header>
		)
	}
}

export default MainHeader;
