import React, { Component } from 'react';
import { DocumentationView } from '../Documentation';

class Documentation extends Component {
    render() {
        return <DocumentationView {...this.state} {...this.props} />
    }
}

export default Documentation;