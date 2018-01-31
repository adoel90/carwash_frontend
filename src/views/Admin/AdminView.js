import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { AdminLogin, AdminDashboard } from '../Admin';

class AdminView extends Component {
    componentDidMount = () => {
        const {
            match,
            history,
            isAuthenticated,
            authenticatedAs
        } = this.props;

        if(isAuthenticated) {
            return history.push(`${match.url}/dashboard`)
        }
        else {
            return history.push(`${match.url}/login`)             
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
            <Switch>
                <PropsRoute
                    name="admin"
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
            </Switch>
        );
    }
}

AdminView.propTypes = {
    
};

export default AdminView;