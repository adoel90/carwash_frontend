//VendorPanel.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { VendorDashboard, VendorMenu,VendorLogOut, VendorEmployee, VendorReport  } from '../../Vendor';
import { StoreCashierDashboard  } from '../../StoreCashier';
import { StoreCashierPanelView } from '../StoreCashierPanel';
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

class StoreCashierPanel extends Component {   

    constructor(props) {
        super(props);
        this.getVendorDetail = this.getVendorDetail.bind(this);        
        this.state = {
            vendor : {},
            vendorList :{},
            routes: [
                        { id: 1, name: 'dashboard', path: `${props.match.url}`, component: StoreCashierDashboard }
                        
            ],
            menus: [
                    { 
                        // category: 'Store Name Selected',
                        category: <img src={require('../../../assets/images/805carwash_white.svg')} alt="805-Carwash" style={{width: "75%"}} />,
                        items: [
                            { id: 1, name: 'Dashboard', path: `${props.match.url}` }
                        ]
                    },
                    {
                        category: '',
                        items: [
                            { id: 1, name: 'Laporan Keuangan', path: `${props.match.url}/laporan` },
                         
                            // { id: 5, name: 'Daftar Promo', path: `${props.match.url}/promo` }
                            StoreCashierPanelView]
                    }
            ]
        }
    }

    componentDidMount = () => {

        // this.getVendorDetail();
    }

    getVendorDetail = () => {

        // const { getVendorState } = this.props;
        // getVendorState();
    }


    componentDidUpdate = (prevProps) => {
        
        // if(prevProps.vendorState.list !== vendorState.list) {}
       
        
    }

    render() {
        return (
            <StoreCashierPanelView
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
)(StoreCashierPanel);