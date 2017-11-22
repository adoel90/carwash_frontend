import React, { Component } from 'react';
import MainContent from '../MainContent';

class AdminContent extends Component {
    render() {
        return (
            <MainContent {...this.props} />
        );
    }
}

export default AdminContent;