import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorMenuView} from '../VendorMenu';
import { getMenuVendorList } from '../../../actions/vendor.action';


function mapStateToProps(state) {
    
    return {
        vendorState : state.vendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorState: () => dispatch(getMenuVendorList())
    }
}

class VendorMenu extends Component {

    constructor(){
        super();
        this.getMenuVendorList = this.getMenuVendorList.bind(this);
    }

    componentDidMount = () => {

        this.getMenuVendorList();
    }

    getMenuVendorList = () => {

        console.log(this.props);
        const { getVendorState } = this.props;

        getVendorState();
    }


    // componentDidUpdate = (prevProps) => {
    //     const { vendorState } = this.props;
        
    //     if(prevProps.vendorState.list !== vendorState.list) {
    //         this.setState({
    //             ...this.state,
    //             vendorList: vendorState.list
    //         });
    //     }
    //     console.log(this.props);
    // }

    render() {
        return (
            <VendorMenuView
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorMenu);