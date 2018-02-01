import React, { Component } from 'react';
import { Main } from './views/Main';


class App extends Component {
    constructor() {
        super();
        this.state = {
            userData: {},
            isAuthenticated: false,
            authenticatedAs: null,
        }
    }
    
    render() {
        return <Main {...this.state} {...this.props} />
    }
}

export default App;