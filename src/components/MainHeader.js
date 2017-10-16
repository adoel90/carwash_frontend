import React from 'react';

class MainHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			logoText: '805 Carwash'
		}
	}

	render() {
		return (
			<header className="header main-header">
				<div className="header__container container">
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
				</div>
			</header>
		)
	}
}

export default MainHeader;
