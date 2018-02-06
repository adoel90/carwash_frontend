import React, { Component } from 'react';
import MainHeader from '../MainHeader';

class AdminHeader extends Component {
    render() {
        return (
            <MainHeader {...this.props} />
        )
    }
}

export default AdminHeader;