import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { AdminLogin, AdminPanel, AdminHeader } from '../Admin';

class AdminView extends Component {
    render() {
        const {
            match,
            userData,
            isAuthenticated,
            authenticatedAs
        } = this.props;
        
        return (
            <div className="admin">
                { isAuthenticated ? <AdminHeader {...this.props} /> : null }
                <PropsRoute
                    name="login"
                    path={`${match.url}/login`}
                    component={AdminLogin}
                    {...this.props}
                />
                <PrivateRoute
                    name="panel"
                    path={`${match.url}`}
                    component={AdminPanel}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'admin'}
                    redirectTo={`${match.url}/login`}
                />
            </div>
        );
    }
}

export default AdminView;