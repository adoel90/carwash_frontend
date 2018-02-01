import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { PropsRoute } from '../../utilities/Route';
import { Service, Cafe, Admin } from '../../views';

class MainView extends Component {
    render() {
        return (
            <Switch>
                <PropsRoute
                    name="service"
                    path="/service"
                    component={Service}
                    {...this.props}
                />
                <PropsRoute
                    name="admin"
                    path="/admin"
                    component={Admin}
                    {...this.props}
                />
                <PropsRoute
                    name="cafe"
                    path="/cafe"
                    component={Cafe}
                    {...this.props}
                />
            </Switch>
        );
    }
}

export default MainView;