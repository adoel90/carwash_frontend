import React, { Component } from 'react';
import { VendorLogOutView } from '../VendorLogOut';

class VendorLogOut extends Component{
    constructor(){
        super();
        this.onLogOutSubmit = this.onLogOutSubmit.bind(this);
        this.state = {
            credentials: {}
        }
    }
    onLogOutSubmit = (e) => {
        
        e.preventDefault();
        console.log(e);
    }

    render(){

        return(
            <VendorLogOutView 
                {...this.props}
                {...this.state}
                onLogOutSubmit={this.onLogOutSubmit}
            />
        )
    }
}

export default VendorLogOut;