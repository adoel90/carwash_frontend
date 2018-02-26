import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { vendorLogin } from '../../../actions/authentication.action';
import { VendorLoginView } from '../VendorLogin';

function mapStateToProps(state) {
    return {
        authentication: state.authentication 
    };
}

function mapDispatchToProps(dispatch) {
    return {
        vendorLogin: bindActionCreators(vendorLogin, dispatch)
    }
}

class VendorLogin extends Component {    

    constructor() {
        super();
        // this.onLoginSubmit = this.onLoginSubmit.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleAuthentication = this.handleAuthentication.bind(this);
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
            vendorLogin
        } = this.props;
        
        const requiredData = {
            username: credentials.username,
            password: credentials.password
        }
        
        vendorLogin(requiredData);
    }
    
    render() {
        return (
            <VendorLoginView 
                {...this.props} 
                {...this.state}
                handleInputChange={this.handleInputChange}
                onLoginSubmit={this.onLoginSubmit}
            />
        )
    }
}

//export default VendorLogin;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorLogin);