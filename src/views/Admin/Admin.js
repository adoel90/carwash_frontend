import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminLogin } from '../../actions/authentication.action';

import AdminView from './AdminView';

function mapStateToProps(state) {
    return {
        authentication: state.authentication 
    };
}

function mapDispatchToProps(dispatch) {
    return {
        adminLogin: bindActionCreators(adminLogin, dispatch)
    }
}

class Admin extends Component {    
    constructor() {
        super();
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.state = {
            isAuthenticated: false,
            authenticatedAs: null,
            userData: {},
            credentials: {
                username: '',
                password: ''
            }
        }
    }

    onLoginSubmit = (e) => {
        e.preventDefault();

        this.handleAuthentication();
    }

    handleInputChange = (object, e) => {        
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        object[name] = value;

        this.setState({
            ...this.state,
            [object]: object
        });
    }

    handleRedirect = () => {
        const {
            match,
            history,
            isAuthenticated,
            authenticatedAs
        } = this.props;

        if(isAuthenticated) {
            return <Redirect from="/*" to={`${match.url}/dashboard`} />
        }

        else {
            return <Redirect from="/*" to={`${match.url}/login`} />
        }
    }

    handleAuthentication = (e) => {
        const {
            loginData
        } = this.state;
        
        const requiredData = {
            username: loginData.username,
            password: loginData.password
        }
        
        this.props.adminLogin(requiredData);
    }
    
    render() {
        return (
            <AdminView
                {...this.state}
                {...this.props}
                handleInputChange={this.handleInputChange}
                handleRedirect={this.handleRedirect}
                handleAuthentication={this.handleAuthentication}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);