import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ServiceView } from '../Service';

function mapStateToProps(state) {
    return {

    };
}

class Service extends Component {
    render() {
        return <ServiceView {...this.props} {...this.state} />
    }
}

export default connect(
    mapStateToProps,
)(Service);