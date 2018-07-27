import React, { Component } from 'react';
import { ElementFormInputView } from '../ElementFormInput';

class ElementFormInput extends Component {
    
    render() {
        
        return (
            <div>
                <ElementFormInputView {...this.state} {...this.props} />
            </div>
        )
    }
};

export default ElementFormInput;