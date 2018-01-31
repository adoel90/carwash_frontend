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
            ? <Component {...props} {...rest} />
            : <Redirect to={{ pathname: redirectTo, state: { from: props.location }} } />
        }
        
        return <Route {...rest} render={Component ? renderComponent : null} />
    }
}

export default PrivateRoute;