import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminVendorView } from '../AdminVendor';

function mapStateToProps(state) {
    return {

    };
}

class AdminVendor extends Component {
    render() {
        return (
            <AdminVendorView
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(
    mapStateToProps,
)(AdminVendor);