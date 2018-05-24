import React, { Component } from 'react';
import { AdminStoreCashierKartuBaruWrapper } from '../AdminStoreCashierKartuBaru';

class AdminStoreCashierKartuBaru extends Component {
    render() {
        return (
          
            <div>
                <AdminStoreCashierKartuBaruWrapper {...this.state} {...this.props} />
            </div>
        ) 
    }
}

export default AdminStoreCashierKartuBaru;