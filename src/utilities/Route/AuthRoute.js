import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class AuthRoute extends Component {
    render() {
        const {
            component: Component,
            isAuthenticated,
            redirectTo,
            ...rest
        } = this.props;

        const renderComponent = (props) => {
			console.log(rest);

            return isAuthenticated
            ? <Component {...this.props} />
            : <Redirect to={ { pathname: redirectTo, state: { from: props.location }} } />
        }
        
        return <Route {...rest} render={Component ? renderComponent : null} />
    }
}

export default AuthRoute;