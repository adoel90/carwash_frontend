import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AdminView } from '../Admin';

function mapStateToProps(state) {
    return {
        authentication: state.authentication
    }
}

class Admin extends Component {
        
    constructor(props) {
        super(props);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.state = {
            isAuthenticated: localStorage.getItem('accessToken') ? true : false,
            authenticatedAs: localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('userData')).module[0].group : null,
            level: localStorage.getItem('accessToken')  ? JSON.parse(localStorage.getItem('userData')).level.id : null,
            userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {},
        }
    }



    componentDidUpdate = (prevProps) => {
        const { authentication } = this.props;

        if(prevProps.authentication != authentication) {
            if(authentication.isAuthenticated) {
                this.handleRedirect();
            }
        }
    }

    handleRedirect = () => {
        const {
            isAuthenticated,
            authenticatedAs,
            userData,
            level
        } = this.state;
        
        const {
            match,
            history,
            authentication
        } = this.props;
        
        
        if(isAuthenticated && authenticatedAs === 'admin') {
            if(level === 1){
                return history.push(`${match.url}/landing`);    
            }
            

        } else if(isAuthenticated && authenticatedAs === 'kasir') {
            if(level === 3){
                return history.push(`${match.url}/landingkasir`);
            }
            
        }

        return history.push(`${match.url}/login`);
    }
    
    render() {
        return (
            <AdminView
                {...this.state}
                {...this.props}
                handleRedirect={this.handleRedirect}
            />
        )
    }
}

export default connect(
    mapStateToProps
)(Admin);