import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { VendorView } from '../Vendor';

function mapStateToProps(state) {
    return {
        authentication: state.authentication
    }
}

class Vendor extends Component {
        
    constructor(props) {
        super(props);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.state = {
            isAuthenticated: localStorage.getItem('accessToken') ? true : false,
            authenticatedAs: localStorage.getItem('accessToken') ? 'vendor' : null,
            userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}

        }
    }

    componentDidUpdate = (prevProps) => {
        const {
            authentication
        } = this.props;
        
        if(prevProps.authentication != authentication) {
            if(authentication.isAuthenticated) {
                this.setState({
                    ...this.state,
                    isAuthenticated: true,
                    authenticatedAs: 'vendor',
                    userData: authentication.userData
                }, () => {
                    this.handleRedirect();
                });
            }
        }
    }

    handleRedirect = () => {
        const {
            isAuthenticated,
            authenticatedAs
        } = this.state;
        
        const {
            match,
            history
        } = this.props;
        
        if(isAuthenticated && authenticatedAs == 'vendor') {
            return history.push(`${match.url}`);
        }

        return history.push(`${match.url}/login`);
    }
    
    render() {
        return (
            <VendorView
                {...this.state}
                {...this.props}
                handleRedirect={this.handleRedirect}
            />
        )
    }
}

export default connect(
    mapStateToProps
)(Vendor);