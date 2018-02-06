import React, { Component } from 'react';

class Printable extends Component {
    render() {
        const {
            children
        } = this.props;
        
        return (
            <div className="printable">
                {children}
            </div>
        );
    }
}

export default Printable;