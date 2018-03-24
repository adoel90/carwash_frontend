import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { StoreCashierMainView } from '../StoreCashier';

function mapStateToProps(state) {
    
    return {
        authentication: state.authentication
    }
}

class StoreCashierMain extends Component {
        
    constructor(props) {
        super(props);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.state = {
            isAuthenticated: localStorage.getItem('accessToken') ? true : false,
            authenticatedAs: localStorage.getItem('accessToken') ? 'kasir' : null,
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
                    authenticatedAs: 'kasir',
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
        
        if(isAuthenticated && authenticatedAs == 'kasir') {
            return history.push(`${match.url}`);
        }

        return history.push(`${match.url}/login`);
    }
    
    render() {
        return (
            <StoreCashierMainView
                {...this.state}
                {...this.props}
                handleRedirect={this.handleRedirect}
            />
        )
    }
}

export default connect(
    mapStateToProps
)(StoreCashierMain);