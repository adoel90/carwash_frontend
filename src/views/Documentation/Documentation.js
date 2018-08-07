import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DocumentationView } from '../Documentation';

function mapStateToProps(state) {
    return {
        authentication: state.authentication
    }
}

class Documentation extends Component {
        
    constructor(props) {
        super(props);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.state = {
            isAuthenticated: localStorage.getItem('accessToken') ? true : false,
            authenticatedAs: localStorage.getItem('accessToken') ? 'admin' : null,
            userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {}
        }
    }

    componentDidUpdate = (prevProps) => {
        const { authentication } = this.props;
        
        if(prevProps.authentication != authentication) {
            if(authentication.isAuthenticated) {
                this.setState({
                    ...this.state,
                    isAuthenticated: true,
                    authenticatedAs: 'admin',
                    userData: authentication.userData
                }, () => {
                    this.handleRedirect();
                });
            }
        }
    }

    handleRedirect = () => {
        const { isAuthenticated, authenticatedAs } = this.state;
        
        const { match, history } = this.props;
        
        if(isAuthenticated && authenticatedAs == 'admin') {
            return history.push(`${match.url}`);
        }

        return history.push(`${match.url}/login`);
    }
    
    render() {
        return (
            <DocumentationView
                {...this.state}
                {...this.props}
                handleRedirect={this.handleRedirect}
            />
        )
    }
}

export default connect( mapStateToProps )(Documentation);