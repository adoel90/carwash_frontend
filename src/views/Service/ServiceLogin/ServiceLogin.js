import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ServiceLoginView } from '../ServiceLogin';

function mapStateToProps(state) {
    return {

    };
}

class ServiceLogin extends Component {
    render() {
        return <ServiceLoginView {...this.props} {...this.state} />
    }
}

export default connect(
    mapStateToProps,
)(ServiceLogin);