import React, { Component } from 'react';
import { ElementButtonView } from '../ElementButton';

class ElementButton extends Component {
    
    render() {
        return (
            <div>
                <ElementButtonView {...this.state} {...this.props} />
            </div>
        )
    }
}

export default ElementButton;