import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MainView } from '../Main';
import { withCookies, Cookies } from 'react-cookie';

function mapStateToProps(state) {
    return {

    };
}

class Main extends Component {
    render() {
        return <MainView {...this.props} {...this.state} />
    }
}

export default connect(
    mapStateToProps,
    null,
    null,
    { pure: false }
)(Main);