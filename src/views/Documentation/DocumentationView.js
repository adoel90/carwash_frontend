import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { PrivateRoute, PropsRoute } from '../../components/Route';
import { DocumentationLogin, DocumentationPanel } from '../Documentation';


class DocumentationView extends Component {
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
                    component={DocumentationLogin}
                    handleRedirect={this.props.handleRedirect}
                />

                <PrivateRoute
                    name="panel"
                    path={`${match.url}`}
                    component={DocumentationPanel}
                    isAuthenticated={isAuthenticated && authenticatedAs == 'admin'}
                    redirectTo={`${match.url}/login`}
                />
            </Switch>
        );
    }
}

export default DocumentationView;