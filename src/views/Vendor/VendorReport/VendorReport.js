import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorReportView } from '../VendorReport';
import { getVendorReportList } from '../../../actions/vendor.action';


function mapStateToProps(state) {
    
    return {
        vendorState : state.vendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorState: () => dispatch(getVendorReportList())
    }
}


class VendorReport extends Component {

    constructor(){
        
        super();
        this.getVendorReportList = this.getVendorReportList.bind(this);

    }

    componentDidMount = () => {

        this.getVendorReportList();
    }

    getVendorReportList = () => {

        // console.log(this.props);
        const { getVendorState } = this.props;
        getVendorState();
    }

    render() {
        return <VendorReportView 
                    {...this.state} 
                    {...this.props} 
                
                />
    }
}

// export default VendorReport;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorReport);