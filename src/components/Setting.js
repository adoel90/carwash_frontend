import React from 'react';
import { Route } from 'react-router-dom';

import MainSidebar from './MainSidebar';
import MainSidenav from './MainSidenav';
import MainContent from './MainContent';

import SettingContainer from '../containers/SettingContainer';
import SettingSubmenuContainer from '../containers/SettingSubmenuContainer';
import SettingCarwashContainer from '../containers/SettingCarwashContainer';
import SettingCafeContainer from '../containers/SettingCafeContainer';
import SettingCustomerContainer from '../containers/SettingCustomerContainer';
import SettingDinnerContainer from '../containers/SettingDinnerContainer';
import SettingLunchContainer from '../containers/SettingLunchContainer';

class Setting extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {
            match
        } = this.props;

        return(
            <main id="setting" className="main">
                <div className="main-container">
                    <MainSidebar>
						<MainSidenav items={this.props.sidenavItems} />
					</MainSidebar>
					<MainContent>
                        <Route name='submenu' path={`${match.url}/submenu`} component={SettingSubmenuContainer} />
                        <Route name='carwash' path={`${match.url}/carwash`} component={SettingCarwashContainer} />
                        <Route name='lunch' path={`${match.url}/lunch`} component={SettingLunchContainer} />
                        <Route name='dinner' path={`${match.url}/dinner`} component={SettingDinnerContainer} />
                        <Route name='customer' path={`${match.url}/customer`} component={SettingCustomerContainer} />
					</MainContent>
                </div>
            </main>
        )
    }
}

export default Setting;
