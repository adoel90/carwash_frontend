import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class ServiceLogin extends Component {
    render() {
        return (
            <div>
                <p>This is the login page.</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ServiceLogin);