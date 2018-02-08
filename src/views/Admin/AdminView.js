import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { AdminLogin, AdminDashboard } from '../Admin';

class AdminView extends Component {
    render() {
        const {
            match,
            userData,
            handleRedirect
        } = this.props;
        
        return (
            <div>
                {handleRedirect()}
                <PropsRoute
                    name="login"
                    path={`${match.url}/login`}
                    component={AdminLogin}
                    {...this.props}
                />
                {/*<PrivateRoute
                    name="dashboard"
                    path={`${match.url}/dashboard`}
                    component={AdminDashboard}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'admin'}
                    redirectTo={`${match.url}/login`}
                    userData={userData}
                />*/}
                <Redirect from={match.url} to={`${match.url}/login`} />
            </div>
        );
    }
}

export default AdminView;