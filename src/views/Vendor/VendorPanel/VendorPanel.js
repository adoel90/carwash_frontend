//VendorPanel.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorDashboard, VendorMenu,VendorLogOut, VendorEmployee, VendorReport  } from '../../Vendor';
import { VendorPanelView } from '../VendorPanel';
import { getVendorDetail } from '../../../actions/vendor.action';


function mapStateToProps(state) {
    
    return {
        vendorState : state.vendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorState: () => dispatch(getVendorDetail())
    }
}

class VendorPanel extends Component {   

    constructor(props) {
        super(props);

        this.getVendorDetail = this.getVendorDetail.bind(this);        

        this.state = {
            vendor : {},
            vendorList :{},

            routes: [
                
                { id: 1, name: 'dashboard', path: `${props.match.url}`, component: VendorDashboard },
                { id: 2, name: 'list-menu', path: `${props.match.url}/list-menu`, component: VendorMenu },
                { id: 3, name: 'log-out', path: `${props.match.url}/log-out`, component: VendorLogOut },
                { id: 4, name: 'employee-management', path: `${props.match.url}/employee`, component: VendorEmployee },
                { id: 5, name: 'report', path: `${props.match.url}/report`, component: VendorReport }

            ],
            menus: [
                { 
                    category: 'Vendor Name Selected',

                    items: [
                        { id: 1, name: 'Dasbor', path: `${props.match.url}` },
                    ]
                },
                {
                    category: 'Manajemen Menu',
                    items: [
                        { id: 1, name: 'Daftar Menu', path: `${props.match.url}/list-menu` },
                        { id: 2, name: 'Akun Saya', path: `${props.match.url}/log-out` },
                        { id: 3, name: 'Employee Management', path: `${props.match.url}/employee` },
                        { id: 4, name: 'Report', path: `${props.match.url}/report` }
                    ]
                }
            ]
        }
    }

    componentDidMount = () => {

        this.getVendorDetail();
    }

    getVendorDetail = () => {

        // console.log(this.props);
        const { getVendorState } = this.props;

        getVendorState();
    }


    componentDidUpdate = (prevProps) => {

        const { vendorState } = this.props;

        if(prevProps.vendorState.list !== vendorState.list) {
       
             this.setState({
                ...this.state,
                vendorList: vendorState.list
                
            });
        }
    }

    render() {
        return (
            <VendorPanelView
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

// export default VendorPanel;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorPanel);