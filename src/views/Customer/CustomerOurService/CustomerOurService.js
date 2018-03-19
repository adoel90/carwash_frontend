import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomerOurServiceView } from '../CustomerOurService';

class CustomerOurService extends Component {

    render() {
        return (
            <CustomerOurServiceView {...this.state} {...this.props} />
        )
    }
}

export default CustomerOurService;
