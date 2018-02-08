import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MainView } from '../Main';
import { withCookies, Cookies } from 'react-cookie';

function mapStateToProps(state) {
    return {
    };
}

class Main extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <MainView
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    null,
    null,
    { pure: false }
)(Main);