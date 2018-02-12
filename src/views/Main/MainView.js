import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PropsRoute } from '../../utilities/Route';
import { Service, Cafe, Admin } from '../../views';

class MainView extends Component {
    render() {
        return (
            <Switch>
                <Route name="service" path="/service" component={Service} />
                <Route name="admin" path="/admin" component={Admin} />
                <Route name="cafe" path="/cafe" component={Cafe} />
            </Switch>
        );
    }
}

export default MainView;