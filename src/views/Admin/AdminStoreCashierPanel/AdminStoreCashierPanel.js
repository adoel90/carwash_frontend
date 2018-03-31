import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { StoreCashierDashboard, StoreCashierTopUp, StoreCashierNewCard, StoreCashierRefund } from '../../StoreCashier';
import { AdminStoreCashierTopUp, AdminStoreCashierNewCard,AdminStoreCashierRefund  } from '../../Admin';
// import { AdminStoreCashierDashboard } from '../../Admin';
import { AdminStoreCashierPanelView } from '../AdminStoreCashierPanel';

class AdminStoreCashierPanel extends Component {   

    constructor(props) {

        super(props);   
        this.state = {
            routes: [
                        // { id: 1, name: 'dashboard', path: `${props.match.url}`, component: AdminStoreCashierDashboard },
                        { id : 1, name: 'topup', path: `${props.match.url}/topup-saldo`, component: AdminStoreCashierTopUp },
                        { id : 2, name: 'kartubaru', path: `${props.match.url}/kartu-baru`, component: AdminStoreCashierNewCard },
                        { id : 3, name: 'refundkartu', path: `${props.match.url}/refund-kartu`, component: AdminStoreCashierRefund }
                        
            ],
            menus: [
                    { 
                        // category: 'Store Name Selected',
                        category: <img src={require('../../../assets/images/805carwash_white.svg')} alt="805-Carwash" style={{width: "75%"}} />,
                        items: [
                            // { id: 1, name: 'Dashboard', path: `${props.match.url}` }
                        ]
                    },
                    {
                        category: '',
                        items: [
                            { id: 1, name: 'Isi Ulang Saldo', path: `${props.match.url}/topup-saldo` },
                            { id: 2, name: 'Kartu Baru', path: `${props.match.url}/kartu-baru` },
                            { id: 3, name: 'Refund Kartu', path: `${props.match.url}/refund-kartu` },
                    
                        ]
                    }
            ]
            // menus:{}
        }

        // this.renderMenu = this.renderMenu.bind(this);
    }

    // componentWillMount = () => {
    //     this.renderMenu();
    // }

    // renderMenu = () => {

    //     const { menus } = this.state;
        
    //     let menu = JSON.parse(localStorage.getItem('userData')).module;

    //     console.log(menu);
        
    //     let newMenu = [];
        
    //     for (let i=0; i<menu.length; i++) {
    //         let dataMenu = {};
    //         let split = menu[i].name.split(" ");

    //         if(split.length > 1) {
    //             dataMenu = {
    //                 category : menu[i].name,
    //                 items: [
    //                     { name: `Daftar ${split[1]}`, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : ''}` }
    //                 ]
    //             }

    //             let itemSeperate = { 
    //                 name: `Buat ${split[1]} Baru`, 
    //                 path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/create-new-` + menu[i].path : ''}` 
    //             }

    //             if (menu[i].group === "admin" && menu[i].path !== "member") {
    //                 dataMenu.items.push(itemSeperate);
    //             }
    //         } else {
    //             dataMenu = {
    //                 category : menu[i].name,
    //                 items: [
    //                     { name: `${split[0]}`, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : ''}` }
    //                 ]
    //             }
    //         }

    //         newMenu.push(dataMenu);
    //     }

    //     this.setState({
    //         menus: newMenu
    //     })
    // }


    render() {
        
        return (
            <AdminStoreCashierPanelView
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

export default AdminStoreCashierPanel;