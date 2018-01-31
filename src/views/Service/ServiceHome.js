import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class ServiceHome extends Component {
    render() {
        return (
            <div>
                <p>ini home</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ServiceHome);