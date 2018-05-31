import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PropsRoute } from '../../utilities/Route';
import { Admin, Customer, Documentation } from '../../views';

class MainView extends Component {
    
    render() {
        return (
            <Switch>
                <Route name="admin" path="/admin" component={Admin} />
                <Route name="customer" path="/customer" component={Customer} />
                <Redirect from="/" to="/customer" />
            </Switch>
        );
    }
}

export default MainView;