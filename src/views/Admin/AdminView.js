import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { AdminLogin, AdminPanel } from '../Admin';


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
                    path={`${match.url}`}
                    component={AdminPanel}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'admin'}
                    redirectTo={`${match.url}/login`}
                />
            </Switch>
        );
    }
}

export default AdminView;