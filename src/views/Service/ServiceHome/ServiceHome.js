import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ServiceHomeView } from '../ServiceHome';

function mapStateToProps(state) {
    return {

    };
}

class ServiceHome extends Component {
    render() {
        return <ServiceHomeView {...this.props} {...this.state} />
    }
}

export default connect(
    mapStateToProps,
)(ServiceHome);