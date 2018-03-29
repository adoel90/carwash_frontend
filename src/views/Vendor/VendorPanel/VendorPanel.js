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
                        { id: 3, name: 'logout', path: `${props.match.url}/logout`, component: VendorLogOut },
                        { id: 4, name: 'employee', path: `${props.match.url}/employee`, component: VendorEmployee },
                        { id: 5, name: 'report', path: `${props.match.url}/report`, component: VendorReport },
                        // { id: 6, name: 'promo', path: `${props.match.url}/promo`, component: VendorPromo }
            ],
            menus: [
                    { 
                        // category: 'Store Name Selected',
                        category: <img src={require('../../../assets/images/805carwash_white.svg')} alt="805-Carwash" style={{width: "75%"}} />,
                        items: [
                            { id: 1, name: 'Dashboard', path: `${props.match.url}` },
                        ]
                    },
                    {
                        category: '',
                        items: [
                            { id: 1, name: 'Daftar Produk', path: `${props.match.url}/list-menu` },
                            { id: 2, name: 'Manajemen Karyawan', path: `${props.match.url}/employee` },
                            { id: 3, name: 'Laporan Transaksi', path: `${props.match.url}/report` },
                            { id: 4, name: 'Pengaturan Akun', path: `${props.match.url}/logout` },
                            // { id: 5, name: 'Daftar Promo', path: `${props.match.url}/promo` }
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

        const { menus, vendorList } = this.state;


        // console.log(menus[0].category);
        // console.log(vendorList);
        /*
            Sekarang akar permasalahan-nya gimana cara setState() "Store Name Selected" menjadi string kosong  

        */

        let dataUntukMenu = {

        }
        
        if(prevProps.vendorState.list !== vendorState.list) {
       
             this.setState({
                ...this.state,
                vendorList: vendorState.list,
            
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