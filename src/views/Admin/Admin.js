import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminView from './AdminView';

function mapStateToProps(state) {
    return {
        
    };
}

class Admin extends Component {    
    render() {
        return <AdminView {...this.props} {...this.state} />
    }
}

export default connect(
    mapStateToProps,
)(Admin);