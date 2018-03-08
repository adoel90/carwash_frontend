import React, { Component } from 'react';
import { VendorPromoView } from '../VendorPromo';

class VendorPromo extends Component {

    render() {
        return <VendorPromoView {...this.state} {...this.props} />
    }
}

export default VendorPromo;