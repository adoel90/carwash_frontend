import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ServiceView } from '../Service';

function mapStateToProps(state) {
    return {

    };
}

class Service extends Component {
    render() {
        console.log(this.props);
        

        return <ServiceView {...this.props} {...this.state} />
    }
}

export default connect(
    mapStateToProps,
)(Service);