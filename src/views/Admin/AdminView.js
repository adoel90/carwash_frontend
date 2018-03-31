import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { AdminLogin, AdminPanel, AdminStoreCashierPanel, AdminStoresPanel} from '../Admin';


class AdminView extends Component {
    render() {
        const {
            match,
            userData,
            isAuthenticated,
            authenticatedAs

        } = this.props;
        
        return (
            
            <Switch>
                
                <PropsRoute
                    name="login"
                    path={`${match.url}/login`}
                    component={AdminLogin}
                    handleRedirect={this.props.handleRedirect}
                />

                <PrivateRoute
                    name="panel"
                    path={`${match.url}/landing`}
                    component={AdminPanel}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'admin'}
                    redirectTo={`${match.url}/login`}
                />

                
                <PrivateRoute
                    name="panelkasir"
                    path={`${match.url}/landingkasir`}
                    component={AdminStoreCashierPanel}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'kasir'}
                    redirectTo={`${match.url}/login`}
                />


                 <PrivateRoute
                    name="panelstores"
                    path={`${match.url}/landingstores`}
                    component={AdminStoresPanel}
                    isAuthenticated={isAuthenticated && authenticatedAs == authenticatedAs}
                    // isAuthenticated={isAuthenticated}
                    redirectTo={`${match.url}/login`}
                />

            </Switch>
        );
    }
}

export default AdminView;