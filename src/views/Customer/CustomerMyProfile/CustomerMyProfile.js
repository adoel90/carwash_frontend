import React, { Component } from 'react';
import { CustomerMyProfileView } from '../CustomerMyProfile';

class CustomerMyProfile extends Component {

    render() {
        return <CustomerMyProfileView {...this.state} {...this.props} />
    }
}

export default CustomerMyProfile;