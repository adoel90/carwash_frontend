import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CafeView } from '../Cafe';

function mapStateToProps(state) {
    return {
        
    };
}

class Cafe extends Component {
    render() {
        return <CafeView {...this.props} {...this.state} />
    }
}

export default connect(
    mapStateToProps,
)(Cafe);