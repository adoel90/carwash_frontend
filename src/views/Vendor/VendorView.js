import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../utilities/Route';
import { VendorLogin, VendorPanel, CashierPanel, CashierLogin } from '../Vendor';


// const VendorView = () => {
//     return (
//         <div>
//             <h1>Hai </h1>
//         </div>
//     );
// };

class VendorView extends Component {

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
                    component={VendorLogin}
                    handleRedirect={this.props.handleRedirect}
                />
                <PrivateRoute
                    name="panel"
                    path={`${match.url}`}
                    component={VendorPanel}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'store'}
                    redirectTo={`${match.url}/login`}
                />
            </Switch>
        );
    }
}

export default VendorView;