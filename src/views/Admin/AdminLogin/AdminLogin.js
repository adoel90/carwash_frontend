import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { adminLogin } from '../../../actions/authentication.action';
import { AdminLoginView } from '../AdminLogin';

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

class AdminLogin extends Component {    
    constructor() {
        super();
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.state = {
            credentials: {
                username: '',
                password: ''
            }
        }
    }

    componentDidMount = () => {
        this.props.handleRedirect();
    }

    handleInputChange = (object, e) => {        
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        this.setState(prevState => ({
            ...prevState,
            [object]: {
                ...prevState[object],
                [name]: value    
            }
        }));
    }

    onLoginSubmit = (e) => {
        e.preventDefault();
        this.handleAuthentication();
    }

    handleAuthentication = (e) => {
        const {
            credentials
        } = this.state;

        const {
            adminLogin
        } = this.props;
        
        const requiredData = {
            username: credentials.username,
            password: credentials.password
        }
        
        adminLogin(requiredData);
    }
    
    render() {
        return (
            <AdminLoginView 
                {...this.props} 
                {...this.state}
                handleInputChange={this.handleInputChange}
                onLoginSubmit={this.onLoginSubmit}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLogin);