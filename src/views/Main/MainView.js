import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PropsRoute } from '../../utilities/Route';
import { Service, Cafe, Admin } from '../../views';

const MainView = props => {
    return (
        <Switch>
            <PropsRoute
                name="service"
                path="/service"
                component={Service}
                {...props}
            />
            <PropsRoute
                name="admin"
                path="/admin"
                component={Admin}
                {...props}
            />
            <PropsRoute
                name="cafe"
                path="/cafe"
                component={Cafe}
                {...props}
            />
        </Switch>
    );
};

export default MainView;