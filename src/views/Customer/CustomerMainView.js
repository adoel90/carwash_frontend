import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { CustomerLogin, CustomerPanel } from '../Customer';
// import { CustomerLogin, CustomerPanelNew } from '../Customer';


// const CustomerMainView = () => {
//     return (
//         <div>
//             <h1>Hai </h1>
//         </div>
//     );
// };

class CustomerMainView extends Component {

    render() {
        const {
            match,
            userData,
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
                    // component={CustomerPanelNew}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'customer'}
                    redirectTo={`${match.url}/login`}
                />
            </Switch>
        );
    }
}

export default CustomerMainView;