import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute } from '../../utilities/Route';
import { Service, Cafe, Admin } from '../../views';

const MainView = props => {
    const {
        userData,
        authenticatedAs
    } = props;
    
    return (
        <Switch>
            <AuthRoute
                name="Service"
                path="/service"
                component={Service}
                isAuthenticated={authenticatedAs == 'member'}
                redirectTo="/service/login"
            />
            <AuthRoute
                name="Admin"
                path="/admin"
                component={Admin}
                isAuthenticated={authenticatedAs == 'admin'}
                redirectTo="/admin/login"
            />
            <AuthRoute
                name="Cafe"
                path="/cafe"
                component={Cafe}
                isAuthenticated={authenticatedAs == 'cafe'}
                redirectTo="/cafe/login"
            />
        </Switch>
    );
};

export default MainView;