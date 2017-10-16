import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import MainSidebar from '../components/MainSidebar';
import MainSidenav from '../components/MainSidenav';
import MainContent from '../components/MainContent';

import RegisterContainer from '../containers/RegisterContainer';
import TopupContainer from '../containers/TopupContainer';

class Cashier extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            match
        } = this.props;

        return(
            <main id="cashier" className="main">
				<div className="main-container">
					<MainSidebar>
						<MainSidenav items={this.props.sidenavItems} />
					</MainSidebar>
					<MainContent>
                        <Route name='cashier' path={`${match.url}/register`} component={RegisterContainer} />
                        <Route name='cashier' path={`${match.url}/topup`} component={TopupContainer} />
					</MainContent>
				</div>
			</main>
        )
    }
}

export default Cashier;
