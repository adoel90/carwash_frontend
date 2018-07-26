import React, { Component } from 'react';
import { DocsCssFrameworkView } from '../DocsCssFramework';

class DocsCssFramework extends Component {


    render() {
        return (
            <div>
                <DocsCssFrameworkView {...this.state} {...this.props} />
            </div>
        )
    }
}

export default DocsCssFramework;