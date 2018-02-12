import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
    render() {
        const {
            component: Component,
            isAuthenticated,
            redirectTo,
            ...rest
        } = this.props;

        const renderComponent = (props) => {
            return isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{ pathname: redirectTo, state: { from: props.location }} } />
        }
        
        return <Route {...rest} render={renderComponent} />
    }
}

export default PrivateRoute;