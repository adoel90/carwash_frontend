//VendorPanel.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorDashboard, VendorMenu,VendorLogOut   } from '../../Vendor';
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
                // { id: 2, name: 'list-vendor', path: `${props.match.url}/list-vendor`, component: VendorUser },
                { id: 2, name: 'list-menu', path: `${props.match.url}/list-menu`, component: VendorMenu },
                { id: 3, name: 'log-out', path: `${props.match.url}/vendor/log-out`, component: VendorLogOut },

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
                        // { id: 1, name: 'Daftar Menu', path: `${props.match.url}/list-vendor` },
                        { id: 1, name: 'Daftar Menu', path: `${props.match.url}/list-menu` },
                        { id: 2, name: 'Akun Saya', path: `${props.match.url}/vendor/log-out` },

                        
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
        console.log(this.props);
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