import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    // AdminDashboard, 
    AdminStoresEmployeeSuperAdm,
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
    AdminReportMember,
    AdminReportSellingTotal,
    AdminLogout,
    AdminSetting,
    AdminStoreCashierTopUp,
    AdminStoreCashierNewCard,
    AdminStoreCashierKartuBaru,
    AdminStoreCashierRefund,
    AdminStoreCashierStockKartu,
    AdminStoreCashierCheckSaldo,
    AdminStoreCashierReport,
    AdminStoresMenu,
    AdminStoresMenuCreate,
    AdminStoresEmployee,
    AdminStoresEmployeeCreate,
    AdminStoresReport,
    AdminTransaction,
    AdminStoresReportMenu,
    AdminStoresMenuSuperAdm,
    AdminStoresCreateEmployeeSuperAdm,
    AdminStoresCreateMenuSuperAdm,
    Documentation
    // AdminStoresReportSuperAdm

} from '../../Admin';

import NoMatch from '../NoMatch';
import { AdminPanelView } from '../AdminPanel';

class AdminPanel extends Component {

    constructor(props) {

        super(props);
        this.state = {
            routes: {},
            menus: {}
        };

        this.renderMenu = this.renderMenu.bind(this);
    }

    componentWillMount = () => {
        this.renderMenu();
    }

    renderMenu = () => {
        const { routes, menus } = this.state;

        let level = JSON.parse(localStorage.getItem('userData')).level;
        let menu = JSON.parse(localStorage.getItem('userData')).module;
        let mainRoute = {};

        console.log(menu);

        if (menu[0].group === 'admin') {
            let routePage = [

                // { name: 'dashboard', path: `${this.props.match.url}`, component: AdminDashboard },                
                { name: 'user', path: `${this.props.match.url}`, component: AdminUser },
                { name: 'user', path: `${this.props.match.url}/user`, component: AdminUser },
                { name: 'create-user', path: `${this.props.match.url}/user/create-new-user`, component: AdminUserCreate },
                { name: 'user-settings', path: `${this.props.match.url}/user/settings`, component: AdminUserSettings },
                { name: 'vendor', path: `${this.props.match.url}/vendor`, component: AdminVendor },
                { name: 'create-new-vendor', path: `${this.props.match.url}/vendor/create-new-vendor`, component: AdminVendorCreate },
                { name: 'member', path: `${this.props.match.url}/member`, component: AdminMember },
                { name: 'card', path: `${this.props.match.url}/card`, component: AdminCard },
                { name: 'create-new-card', path: `${this.props.match.url}/card/create-new-card`, component: AdminCardCreate },
                { name: 'access', path: `${this.props.match.url}/access`, component: AdminAccess },
                { name: 'create-new-access', path: `${this.props.match.url}/access/create-new-access`, component: AdminAccessCreate },
                { name: 'store', path: `${this.props.match.url}/store`, component: AdminStore },
                { name: 'create-new-store', path: `${this.props.match.url}/store/create-new-store`, component: AdminStoreCreate },
                { name: 'report-member', path: `${this.props.match.url}/report/report-member`, component: AdminReportMember },
                { name: 'report', path: `${this.props.match.url}/report`, component: AdminReportSellingTotal },
                { name: 'report-kasir-superadmin', path: `${this.props.match.url}/report/report-kasir-superadmin`, component: AdminStoreCashierReport },
                { name: 'logout', path: `${this.props.match.url}/logout`, component: AdminLogout },
                { name: 'setting', path: `${this.props.match.url}/setting`, component: AdminSetting },

                //#Fussion Owner & Superadmin
                { name: 'staf-super', path: `${this.props.match.url}/staff`, component: AdminStoresEmployeeSuperAdm },
                { name: 'create-new-staff', path: `${this.props.match.url}/staff/create-new-staff`, component: AdminStoresCreateEmployeeSuperAdm },
                { name: 'product', path: `${this.props.match.url}/product`, component: AdminStoresMenuSuperAdm },
                { name: 'create-new-product', path: `${this.props.match.url}/product/create-new-product`, component: AdminStoresCreateMenuSuperAdm },


                //#Fussion Kasir & Superadmin
                { name: 'topup', path: `${this.props.match.url}/topup`, component: AdminStoreCashierTopUp },
                { name: 'new-card', path: `${this.props.match.url}/new-card`, component: AdminStoreCashierKartuBaru},
                { name: 'stock-kartu', path: `${this.props.match.url}/new-card/stock-kartu`, component: AdminStoreCashierStockKartu },
                { name: 'balance', path: `${this.props.match.url}/balance`, component: AdminStoreCashierCheckSaldo },
                { name: 'refund', path: `${this.props.match.url}/refund`, component: AdminStoreCashierRefund },
                { component: NoMatch }
            ];
            mainRoute = routePage;

        } else if (menu[0].group === 'kasir') {

            let routePage = [
                { name: 'topup', path: `${this.props.match.url}/topup`, component: AdminStoreCashierTopUp },
                { name: 'new-card', path: `${this.props.match.url}/new-card`, component: AdminStoreCashierNewCard },
                { name: 'kartu-baru', path: `${this.props.match.url}/new-card/kartu-baru-new`, component: AdminStoreCashierKartuBaru },
                { name: 'stock-kartu', path: `${this.props.match.url}/new-card/stock-kartu`, component: AdminStoreCashierStockKartu },
                { name: 'refund', path: `${this.props.match.url}/refund`, component: AdminStoreCashierRefund },
                { name: 'balance', path: `${this.props.match.url}/balance`, component: AdminStoreCashierCheckSaldo },
                { name: 'logout', path: `${this.props.match.url}/logout`, component: AdminLogout },
                { name: 'setting', path: `${this.props.match.url}/setting`, component: AdminSetting },
                { name: 'report', path: `${this.props.match.url}/report`, component: AdminStoreCashierReport },
                { component: NoMatch }
            ];
            mainRoute = routePage;

        } else if (menu[0].group === 'store') {

            if (level.name === 'Owner') {
                let routePage = [
                    { name: 'product', path: `${this.props.match.url}/product`, component: AdminStoresMenu },
                    { name: 'create-new-product', path: `${this.props.match.url}/product/create-new-product`, component: AdminStoresMenuCreate },
                    { name: 'staff', path: `${this.props.match.url}/staff`, component: AdminStoresEmployee },
                    { name: 'create-new-staff', path: `${this.props.match.url}/staff/create-new-staff`, component: AdminStoresEmployeeCreate },
                    { name: 'logout', path: `${this.props.match.url}/logout`, component: AdminLogout },
                    { name: 'transaction', path: `${this.props.match.url}/transaction`, component: AdminTransaction },
                    { name: 'report', path: `${this.props.match.url}/report`, component: AdminStoresReport },
                    { name: 'report-menu', path: `${this.props.match.url}/report/report-menu`, component: AdminStoresReportMenu },
                    { name: 'setting', path: `${this.props.match.url}/setting`, component: AdminSetting },
                    { component: NoMatch }
                ];

                mainRoute = routePage;

            } else if (level.name === 'Staff') {

                let routePage = [
                    { name: 'transaction', path: `${this.props.match.url}/transaction`, component: AdminTransaction },
                    { name: 'logout', path: `${this.props.match.url}/logout`, component: AdminLogout },
                    { name: 'report-menu', path: `${this.props.match.url}/report/report-menu`, component: AdminStoresReportMenu },
                    { name: 'report', path: `${this.props.match.url}/report`, component: AdminStoresReport },
                    { name: 'setting', path: `${this.props.match.url}/setting`, component: AdminSetting },
                    { component: NoMatch }
                ];

                mainRoute = routePage;

            } else {
                let routePage = [
                    { name: 'logout', path: `${this.props.match.url}/logout`, component: AdminLogout },
                    { component: NoMatch }
                ];

                mainRoute = routePage;
            }

        } else {
            mainRoute = [];
        }

        /* Create Menu Nav */
        let newMenu = [];

        for (let i = 0; i < menu.length; i++) {

            let dataMenu = {};
            let split = menu[i].name.split(" ");

            let nameCategory = menu[0].group !== 'kasir' ? `${menu[i].name}` : `${menu[i].name}`;
            let nameRoute = menu[0].group === 'kasir' ? `${menu[i].name}` : `Daftar ${split[1]}`;

            let nameRouteReportSuperadmin = `${menu[i].name}`;
            let nameRouteReportStore = `${menu[i].name}`;

            let nameRouteKasirSuperadmin = `${menu[i].name}`;

            let dataItems = [];

            console.log(split);



            //#MENU LAPORAN PENNJUALAN STORE OWNER
            if (split.length === 1 && split[0] === "Laporan" && level.name === "Owner") {
                let linkItem = { name: nameRouteReportStore, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : 'null'}` }

                dataMenu = {
                    category: nameCategory,
                    items: []
                }

                if (menu[i].path !== "report") {
                    dataMenu.items.push(linkItem)
                };

                //Laporan Penjualan Owner
                let itemSeparatorReportSelling = {
                    name: `${split[0]} Penjualan`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                if (menu[i].group === "all" && menu[i].path === "report") {
                    dataMenu.items.push(itemSeparatorReportSelling);
                }

                //Laporan Menu
                let laporanMenu = {
                    name: `${split[0]} Menu`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/report-menu` : 'null'}`
                }

                if (menu[i].group === "all" && menu[i].path === "report") {
                    dataMenu.items.push(laporanMenu);
                }
            }
            //# MENU LAPORAN PENJUALAN Superadmin
            else if (split.length === 1 && split[0] === "Laporan" && level.name === "Superadmin") {

                //Laporan Superadmin
                let linkItem = { name: nameRouteReportSuperadmin, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : 'null'}` }

                dataMenu = {
                    category: nameCategory,
                    items: []
                }

                if (menu[i].path !== "report") {
                    dataMenu.items.push(linkItem)
                }

                //Laporan Total Pennjualan Superadmin
                let itemSeparateReport = {
                    name: `${split[0]} Total Penjualan`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };
                if (menu[i].group === "all" && menu[i].path === "report") {
                    dataMenu.items.push(itemSeparateReport);
                };

                //Laporan Kasir Superadmin
                let laporanKasirInSuperAdmin = {
                    name: `${split[0]} Kasir`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/report-kasir-superadmin` : 'null'}`
                };

                if (menu[i].group === "all" && menu[i].path === "report") {
                    dataMenu.items.push(laporanKasirInSuperAdmin);
                };

                //Laporan Member
                let laporanMember = {
                    name: `${split[0]} Member`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/report-member` : 'null'}`
                };

                if (menu[i].group === "all" && menu[i].path === "report") {
                    dataMenu.items.push(laporanMember);
                };
            }
            //#ISI ULANG SUPERADMIN
            else if (split[0] === "Isi"){

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                //ISI ULANG KASIR
                let isiUlangKasirSuperadmin = {
                    name: `Isi Ulang`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                if (menu[i].id === 8 && menu[i].path === "topup") {
                    dataMenu.items.push(isiUlangKasirSuperadmin);
                };

            }
            //#CHECK SALDO SUPERADMIN
            else if(split[0] === "Cek"){
                
                dataMenu = {
                    category : nameCategory,
                    items: []
                };

                let checkSaldoKasirSuperadmin =  {
                    name: `Check Saldo`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                if(menu[i].id === 16 && menu[i].path === "balance"){
                    dataMenu.items.push(checkSaldoKasirSuperadmin);
                };
            } 
            //#REFUND KARTU SUPERADMIN
            else if(split[0] === "Refund"){
                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                let refundKartuSuperadmin = {
                    name: `Refund Kartu`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                if(menu[i].id === 10 && menu[i].path === "refund"){
                    dataMenu.items.push(refundKartuSuperadmin);
                };


            }
            //#KARTU BARU SUPERADMIN
            else if(split[0] === "Kartu" && level.name === "Superadmin"){
               

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                // KARTU BARU KASIR - SUPERADMIN
                let kartuBaruKasirSuperadmin = {
                    name: `Kartu Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                if (menu[i].id === 9 && menu[i].path === "new-card") {
                    dataMenu.items.push(kartuBaruKasirSuperadmin);
                    
                };

                // //STOCK KARTU KASIR - SUPERADMIN
                let stockKartuKasirSuperadmin = {
                    name: `Stock Kartu`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                    // path: `${this.props.match.url}${menu[i].path ? `/new-card` : 'null'}`
                };
                
                if (menu[i].path === "stock-kartu") {
                    dataMenu.items.push(stockKartuKasirSuperadmin);
                };
            }
            
            
            //# Features of KASIR
            else if (split.length === 2 && split[0] === "Kartu" && level.name === "Kasir") {

                // console.log(split)
                dataMenu = {
                    category: nameCategory,
                    items: []
                }

                //#Feature Kartu Baru -New Card (NEW)
                let kartuBaruNew = {
                    name: `${split[0]} Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/kartu-baru-new` : 'null'}`
                }

                if (menu[i].group === "kasir") {
                    dataMenu.items.push(kartuBaruNew);
                };

                //#Feature Stock Kartu
                let stockKartuBaru = {
                    name: `Stock ${split[0]}`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/stock-kartu` : 'null'}`
                };
    
                if (menu[i].group === "kasir") {
                    dataMenu.items.push(stockKartuBaru);
                };
            }

            else if (split.length > 1) {
                dataMenu = {
                    category: nameCategory,
                    items: [
                        { name: nameRoute, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : ''}` }
                    ]
                }

                let itemSeperate = {
                    name: `Buat ${split[1]} Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/create-new-` + menu[i].path : ''}`
                }

                if (menu[i].group === "admin" && menu[i].path !== "member") {
                    dataMenu.items.push(itemSeperate);

                }

                if (menu[i].group === "store") {
                    dataMenu.items.push(itemSeperate);
                }

            } else {
                dataMenu = {
                    category: menu[i].name,
                    items: [
                        { name: `${split[0]}`, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : ''}` }
                    ]
                }
            }

            newMenu.push(dataMenu);
        }

        this.setState({
            menus: newMenu,
            routes: mainRoute
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