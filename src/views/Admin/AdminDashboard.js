import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class AdminDashboard extends Component {
    render() {
        return (
            <div>
                <p>This is the dashboard page.</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(AdminDashboard);