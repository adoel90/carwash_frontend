import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { AdminLogin, AdminDashboard } from '../Admin';

class AdminView extends Component {
    constructor() {
        super();
        this.handleRedirect = this.handleRedirect.bind(this);
    }
    
    handleRedirect = () => {
        const {
            match,
            history,
            isAuthenticated,
            authenticatedAs
        } = this.props;

        if(isAuthenticated) {
            return <Redirect from="/*" to={`${match.url}/dashboard`} />
        }
        else {
            return <Redirect from="/*" to={`${match.url}/login`} />
        }
    }
    
    render() {
        const {
            match,
            isAuthenticated,
            authenticatedAs,
            userData
        } = this.props;
        
        return (
            <div>
                {this.handleRedirect()}
                <PropsRoute
                    name="login"
                    path={`${match.url}/login`}
                    component={AdminLogin}
                    userData={userData}
                />
                <PrivateRoute
                    name="dashboard"
                    path={`${match.url}/dashboard`}
                    component={AdminDashboard}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'admin'}
                    redirectTo={`${match.url}/login`}
                    userData={userData}
                />
                <Redirect from={match.url} to={`${match.url}/login`} />
            </div>
        );
    }
}

export default AdminView;