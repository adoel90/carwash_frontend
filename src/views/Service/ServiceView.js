import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PropsRoute, PrivateRoute } from '../../utilities/Route';
import { ServiceLogin, ServiceHome, ServiceProfile } from '../Service';

class ServiceView extends Component {
    render() {
        const {
            match,
            isAuthenticated
        } = this.props;
        
        return (
            <Switch>
                <PropsRoute
                    name="login"
                    path={`${match.url}/login`}
                    component={ServiceLogin}
                    {...this.props}
                />
                <PrivateRoute
                    name="home"
                    path={`${match.url}/home`}
                    component={ServiceHome}
                    isAuthenticated={isAuthenticated}
                    redirectTo={`${match.url}/login`}
                />
                <PrivateRoute
                    name="profile"
                    path={`${match.url}/profile`}
                    component={ServiceProfile}
                    isAuthenticated={isAuthenticated}
                    redirectTo={`${match.url}/home`}
                />
                <Redirect from={`${match.url}`} to={`${match.url}/login`} />
            </Switch>
        );
    }
}

export default ServiceView;