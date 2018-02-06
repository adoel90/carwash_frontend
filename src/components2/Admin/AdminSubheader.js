import React, { Component } from 'react';
import MainSubheader from '../MainSubheader';

class AdminSubheader extends Component {
    render() {
        return (
            <MainSubheader {...this.props} />
        );
    }
}

export default AdminSubheader;