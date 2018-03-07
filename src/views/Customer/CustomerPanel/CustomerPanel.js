//VendorPanel.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomerDashboard  } from '../../Customer';
import { CustomerPanelView } from '../CustomerPanel';
// import { getVendorDetail } from '../../../actions/vendor.action';


function mapStateToProps(state) {
    
    return {
        // vendorState : state.vendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        // getVendorState: () => dispatch(getVendorDetail())
    }
}

class CustomerPanel extends Component {   

    constructor(props) {
        super(props);

        // this.getVendorDetail = this.getVendorDetail.bind(this);        

        this.state = {

            vendor : {},
            vendorList :{},

            routes: [
                
                { id: 1, name: 'dashboard', path: `${props.match.url}`, component: CustomerDashboard }
         

            ],
            menus: [
                { 
                    category: 'Vendor Name Selected',

                    items: [
                        { id: 1, name: 'Dashboard', path: `${props.match.url}` },
                    ]
                },
                {
                    category: 'Manajemen Menu',
                    items: [
                        { id: 1, name: 'Pengaturan Akun', path: `${props.match.url}/log-out` },
                        { id: 2, name: 'Daftar Produk', path: `${props.match.url}/list-menu` },
                        
                    ]
                }
            ]
        }
    }

    componentDidMount = () => {

        // this.getVendorDetail();
    }

    getVendorDetail = () => {

        // console.log(this.props);
        // const { getVendorState } = this.props;

        // getVendorState();
    }


    componentDidUpdate = (prevProps) => {

        // const { vendorState } = this.props;

        // if(prevProps.vendorState.list !== vendorState.list) {
       
        //      this.setState({
        //         ...this.state,
        //         vendorList: vendorState.list
                
        //     });
        // }
    }

    render() {
        return (
            <CustomerPanelView
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

export default CustomerPanel;
