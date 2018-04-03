import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
    AdminDashboard, 
    AdminUser, 
    AdminUserCreate,
    AdminUserSettings,
    AdminVendor,
    AdminVendorCreate,
    AdminMember,
    AdminCard,
    AdminCardCreate,
    AdminAccess,
    AdminAccessCreate,
    AdminStore,
    AdminStoreCreate,
    AdminReport,
    AdminLogout,
    AdminSetting,
    AdminStoreCashierTopUp,
    AdminStoreCashierNewCard,
    AdminStoreCashierRefund,
    AdminStoresMenu,
    AdminStoresEmployee,
    AdminStoresReport,
    AdminStoresPromo
} from '../../Admin';

import { AdminPanelView } from '../AdminPanel';

class AdminPanel extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            routes: [

                { name: 'dashboard', path: `${props.match.url}`, component: AdminDashboard },
                { name: 'user', path: `${props.match.url}/user`, component: AdminUser },
                { name: 'create-user', path: `${props.match.url}/user/create-new-user`, component: AdminUserCreate },
                { name: 'user-settings', path: `${props.match.url}/user/settings`, component: AdminUserSettings },
                { name: 'vendor', path: `${props.match.url}/vendor`, component: AdminVendor },           
                { name: 'create-new-vendor', path: `${props.match.url}/vendor/create-new-vendor`, component: AdminVendorCreate },
                { name: 'member', path: `${props.match.url}/member`, component: AdminMember },
                { name: 'card', path: `${props.match.url}/card`, component: AdminCard },
                { name: 'create-new-card', path: `${props.match.url}/card/create-new-card`, component: AdminCardCreate },
                { name: 'access', path: `${props.match.url}/access`, component: AdminAccess },
                { name: 'create-new-access', path: `${props.match.url}/access/create-new-access`, component: AdminAccessCreate },
                { name: 'store', path: `${props.match.url}/store`, component: AdminStore },
                { name: 'create-new-store', path: `${props.match.url}/store/create-new-store`, component: AdminStoreCreate },
                { name: 'report', path: `${props.match.url}/report`, component: AdminReport },
                { name: 'logout', path: `${props.match.url}/logout`, component: AdminLogout },
                { name: 'setting', path: `${props.match.url}/setting`, component: AdminSetting },


                { name: 'topup', path: `${props.match.url}/topup`, component: AdminStoreCashierTopUp },
                { name: 'new-card', path: `${props.match.url}/new-card`, component: AdminStoreCashierNewCard },
                { name: 'refund', path: `${props.match.url}/refund`, component: AdminStoreCashierRefund },

                { name: 'product', path: `${props.match.url}/product`, component: AdminStoresMenu },
                { name: 'staff', path: `${props.match.url}/staff`, component: AdminStoresEmployee },
                { name: 'discount', path: `${props.match.url}/discount`, component: AdminStoresPromo },
                // { name: 'report', path: `${props.match.url}/report`, component: AdminStoresPromo }

            ],
            menus: {}
        }

        this.renderMenu = this.renderMenu.bind(this);
    }

    componentWillMount = () => {
        this.renderMenu();
    }

    renderMenu = () => {
        const {
            menus
        } = this.state;
        
        let menu = JSON.parse(localStorage.getItem('userData')).module;

        let newMenu = [];
        
        for (let i=0; i<menu.length; i++) {
            let dataMenu = {};
            let split = menu[i].name.split(" ");

            if(split.length > 1) {
                dataMenu = {
                    category : menu[i].name,
                    items: [
                        { name: `Daftar ${split[1]}`, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : ''}` }
                    ]
                }

                let itemSeperate = { 
                    name: `Buat ${split[1]} Baru`, 
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/create-new-` + menu[i].path : ''}` 
                }

                if (menu[i].group === "admin" && menu[i].path !== "member") {
                    dataMenu.items.push(itemSeperate);
                }
            } else {
                dataMenu = {
                    category : menu[i].name,
                    items: [
                        { name: `${split[0]}`, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : ''}` }
                    ]
                }
            }

            newMenu.push(dataMenu);
        }

        this.setState({
            menus: newMenu
        })
    }
    
    render() {
        const user = JSON.parse(localStorage.getItem('userData'));
        return (
            <AdminPanelView
                {...this.state} 
                {...this.props} 
                user={user}
            />
        )
    }
}

export default AdminPanel;