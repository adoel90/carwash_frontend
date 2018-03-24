import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { StoreCashierLogin, StoreCashierPanel } from '../StoreCashier';


// const StoreCashierMainView = () => {
//     return (
//         <div>
//             <h1>Hai </h1>
//         </div>
//     );
// };

class StoreCashierMainView extends Component {

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
                    component={StoreCashierLogin}
                    handleRedirect={this.props.handleRedirect}
                />
                <PrivateRoute
                    name="panel"
                    path={`${match.url}`}
                    component={StoreCashierPanel}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'kasir'}
                    redirectTo={`${match.url}/login`}
                />
            </Switch>
        );
    }
}

export default StoreCashierMainView;