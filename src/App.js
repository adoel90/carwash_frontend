import React, { Component } from 'react';
import { Main } from './views/Main';

class App extends Component {
    render() {
        return (
            <Main 
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

export default App;