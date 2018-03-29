import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CustomerView } from '../Customer';

class Customer extends Component {
        
    constructor(props) {
        super(props);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.state = {
            isAuthenticated: localStorage.getItem('accessToken') ? true : false,
            authenticatedAs: localStorage.getItem('accessToken') ? 'member' : null,
            member: localStorage.getItem('member') ? JSON.parse(localStorage.getItem('member')) : {}
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
                    authenticatedAs: 'member',
                    member: authentication.member
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
        
        if(isAuthenticated && authenticatedAs == 'member') {
            return history.push(`${match.url}`);
        }

        return history.push(`${match.url}/login`);
    }
    
    render() {
        return (
            <CustomerView
                {...this.state}
                {...this.props}
                handleRedirect={this.handleRedirect}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    }
}

export default connect(
    mapStateToProps
)(Customer);