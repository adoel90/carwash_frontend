import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { CustomerLogin, CustomerPanel } from '../Customer';

class CustomerView extends Component {
    render() {
        const {
            match,
            member,
            isAuthenticated,
            authenticatedAs
        } = this.props;
        
        return (
            
            <Switch>
                <PropsRoute
                    name="login"
                    path={`${match.url}/login`}
                    component={CustomerLogin}
                    handleRedirect={this.props.handleRedirect}
                />

                <PrivateRoute
                    name="panel"
                    path={`${match.url}`}
                    component={CustomerPanel}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'member'}
                    redirectTo={`${match.url}/login`}
                />
            </Switch>
        );
    }
}

export default CustomerView;