import React, { Component } from 'react';
import { CustomerLoginView } from '../CustomerLogin';

class CustomerLogin extends Component {

    render() {
        return <CustomerLoginView {...this.state} {...this.props} />
    }
}

export default CustomerLogin;