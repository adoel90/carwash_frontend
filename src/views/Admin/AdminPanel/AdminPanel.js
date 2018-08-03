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
    AdminCardSetting,
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
    AdminStoreCashierTulisKartuBaru,
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
    AdminTransactionSuperAdm,
    AdminSettingSuperAdm,
    AdminStoreCashierReportSuperAdm
    // AdminStoresReportSuperAdm

} from '../../Admin';

import NoMatch from '../NoMatch';
import { AdminPanelView } from '../AdminPanel';
import { memberCustomerTopup } from '../../../actions/member.action';

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
    };

    renderMenu = () => {
        const { routes, menus } = this.state;

        let level = JSON.parse(localStorage.getItem('userData')).level;
        let menu = JSON.parse(localStorage.getItem('userData')).module;
        let mainRoute = {};

        if (menu[0].group === 'admin') {
            let routePage = [
                // { name: 'dashboard', path: `${this.props.match.url}`, component: AdminDashboard },                
                { name: 'user', path: `${this.props.match.url}`, component: AdminUser },
                { name: 'user', path: `${this.props.match.url}/user`, component: AdminUser },
                { name: 'create-new-user', path: `${this.props.match.url}/user/create-new-user`, component: AdminUserCreate },
                { name: 'user-settings', path: `${this.props.match.url}/user/settings`, component: AdminUserSettings },
                { name: 'vendor', path: `${this.props.match.url}/vendor`, component: AdminVendor },
                { name: 'create-new-vendor', path: `${this.props.match.url}/vendor/create-new-vendor`, component: AdminVendorCreate },
                { name: 'member', path: `${this.props.match.url}/member`, component: AdminMember },
                { name: 'card', path: `${this.props.match.url}/card`, component: AdminCard },
                { name: 'card-setting', path: `${this.props.match.url}/card/card-setting`, component: AdminCardSetting },
                { name: 'create-new-card', path: `${this.props.match.url}/card/create-new-card`, component: AdminCardCreate },
                { name: 'access', path: `${this.props.match.url}/access`, component: AdminAccess },
                { name: 'create-new-access', path: `${this.props.match.url}/access/create-new-access`, component: AdminAccessCreate },
                { name: 'store', path: `${this.props.match.url}/store`, component: AdminStore },
                { name: 'create-new-store', path: `${this.props.match.url}/store/create-new-store`, component: AdminStoreCreate },
                { name: 'report-member', path: `${this.props.match.url}/report/report-member`, component: AdminReportMember },
                { name: 'report', path: `${this.props.match.url}/report`, component: AdminReportSellingTotal },
                { name: 'report-kasir-superadmin', path: `${this.props.match.url}/report/report-kasir-superadmin`, component: AdminStoreCashierReport },
                { name: 'repot', path: `${this.props.match.url}/report/repot`, component: AdminStoreCashierReportSuperAdm },
                { name: 'logout', path: `${this.props.match.url}/logout`, component: AdminLogout },
                { name: 'setting', path: `${this.props.match.url}/setting`, component: AdminSettingSuperAdm },

                //#Fussion Owner & Superadmin
                { name: 'staff', path: `${this.props.match.url}/product/staff`, component: AdminStoresEmployeeSuperAdm },
                { name: 'create-new-staff', path: `${this.props.match.url}/product/create-new-staff`, component: AdminStoresCreateEmployeeSuperAdm },
                { name: 'product', path: `${this.props.match.url}/product`, component: AdminStoresMenuSuperAdm },
                { name: 'create-new-product', path: `${this.props.match.url}/product/create-new-product`, component: AdminStoresCreateMenuSuperAdm },
                { name: 'transaction', path: `${this.props.match.url}/product/transaction`, component: AdminTransactionSuperAdm },

                //#Fussion Kasir & Superadmin
                { name: 'topup', path: `${this.props.match.url}/member/topup`, component: AdminStoreCashierTopUp },
                { name: 'new-card', path: `${this.props.match.url}/member/new-card`, component: AdminStoreCashierKartuBaru},
                { name: 'stock-kartu', path: `${this.props.match.url}/member/stock-kartu`, component: AdminStoreCashierTulisKartuBaru },
                { name: 'balance', path: `${this.props.match.url}/member/balance`, component: AdminStoreCashierCheckSaldo },
                { name: 'refund', path: `${this.props.match.url}/member/refund`, component: AdminStoreCashierRefund },
                { component: NoMatch }
            ];
            mainRoute = routePage;

        } else if (menu[0].group === 'kasir'){

            let routePage = [
                { name: 'topup', path: `${this.props.match.url}/new-card/topup`, component: AdminStoreCashierTopUp },
                { name: 'new-card', path: `${this.props.match.url}/new-card`, component: AdminStoreCashierNewCard },
                { name: 'kartu-baru', path: `${this.props.match.url}/new-card/kartu-baru-new`, component: AdminStoreCashierKartuBaru },
                { name: 'stock-kartu', path: `${this.props.match.url}/new-card/stock-kartu`, component: AdminStoreCashierTulisKartuBaru },
                { name: 'refund', path: `${this.props.match.url}/new-card/refund`, component: AdminStoreCashierRefund },
                { name: 'balance', path: `${this.props.match.url}/new-card/balance`, component: AdminStoreCashierCheckSaldo },
                { name: 'logout', path: `${this.props.match.url}/logout`, component: AdminLogout },
                { name: 'setting', path: `${this.props.match.url}/setting`, component: AdminSetting },
                { name: 'report', path: `${this.props.match.url}/report`, component: AdminStoreCashierReport },
                { component: NoMatch }
            ];
            mainRoute = routePage;

        } else if (menu[0].group === 'store'){

            if (level.name === 'Owner') {
                let routePage = [
                    { name: 'transaction', path: `${this.props.match.url}/product/transaction`, component: AdminTransaction },
                    { name: 'product', path: `${this.props.match.url}/product`, component: AdminStoresMenu },
                    { name: 'create-new-product', path: `${this.props.match.url}/product/create-new-product`, component: AdminStoresMenuCreate },
                    { name: 'staff', path: `${this.props.match.url}/product/staff`, component: AdminStoresEmployee },
                    { name: 'create-new-staff', path: `${this.props.match.url}/product/create-new-staff`, component: AdminStoresEmployeeCreate },
                    { name: 'logout', path: `${this.props.match.url}/logout`, component: AdminLogout },
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
        };

        console.log(menu);
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

            //#Superadmin -- Jenis Membership
            if(split[0] === "Jenis" && level.name === "Superadmin" ){

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                //JENIS MEMBERSHIP SUPERADMIN
                let jenisMemberShipSuperadmin = {
                    name: `Jenis Kartu Member`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                //SETTING JENIS KARTU SUPERADMIN
                let settingMembership = {
                    name: `Pengaturan Jenis Kartu`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/card-setting` : 'null'}`
                };

                if (menu[i].id === 5 && menu[i].path === "card") {
                    dataMenu.items.push(jenisMemberShipSuperadmin);
                    // dataMenu.items.push(settingMembership);
                };
            }
            //#Superadmin -- Member
            else if(split[0] === "Kasir" && level.name === "Superadmin"){

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                //DAFTAR MEMBER BARU
                let daftarMemberBaruSuperadmin = {
                    name : "Daftar Member",
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                //BUAT MEMBER BARU KASIR SUPERADMIN
                let kartuBaruKasirSuperadmin = {
                    name: `Buat Member Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/new-card` : 'null'}`
                };

                //ISI ULANG KASIR SUPERADMIN
                let isiUlangKasirSuperadmin = {
                    name: `Isi Ulang`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/topup` : 'null'}`
                };

                //REFUND KASIR SUPERADMIN
                let refundKartuSuperadmin = {
                    name: `Refund`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/refund` : 'null'}`
                };

                //CHECK SALDO KASIR SUPERADMIN
                let checkSaldoKasirSuperadmin =  {
                    name: `Cek Saldo`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/balance` : 'null'}`
                };

                //STOCK KARTU KASIR SUPERADMIN
                let stockKartuKasirSuperadmin = {
                    name: `Tulis Kartu Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/stock-kartu` : 'null'}`
                };

                if(menu[i].group === "admin"){
                    dataMenu.items.push(daftarMemberBaruSuperadmin);
                    dataMenu.items.push(kartuBaruKasirSuperadmin);
                    dataMenu.items.push(isiUlangKasirSuperadmin);
                    dataMenu.items.push(refundKartuSuperadmin);
                    dataMenu.items.push(checkSaldoKasirSuperadmin);
                    dataMenu.items.push(stockKartuKasirSuperadmin);
                };
            } 
            //#MANAJEMEN STORE SUPERADMIN - DAFTAR STORE, BUAT STORE BARU, TRANSAKSI 
            else if(split[1] === "Toko" && level.name === "Superadmin"){

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                //DAFTAR STORE SUPERADMIN
                let daftarStoreSuperadmin = {
                    name: `Daftar Toko`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                //BUAT STORE BARU
                let buatStoreBaruSuperadmin = {
                    name: `Buat Toko Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/create-new-store` : 'null'}`
                };

                if (menu[i].group === "admin") {
                    dataMenu.items.push(daftarStoreSuperadmin);
                    dataMenu.items.push(buatStoreBaruSuperadmin);
                };
            }
            //#MANAJEMEN PRODUK ATAU TOKO
            else if(split[0] === "Toko" && level.name === "Superadmin"){
                
                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                //TRANSAKSI/ PENJUALAN SUPERADMIN
                let transactionSuperadmin = {
                   name: `Penjualan`,
                   path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/transaction` : 'null'}`
                };

                //DAFTAR STAFF
                let daftarStaffSuperadmin = {
                    name: `Daftar Staff`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/staff` : 'null'}`
                };

                //BUAT STAFF BARU
                let buatStaffBaruSuperadmin = {
                    name: `Buat Staff Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/create-new-staff` : 'null'}`
                };

                //DAFTAR PRODUK
                let daftarProdukSuperadmin = {
                    name: `Daftar Produk`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                //BUAT PRODUK BARU 
                let buatProdukBaruSuperadmin = {
                    name: `Buat Produk Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/create-new-product` : 'null'}`
                };
                
                //FIRST METHOD IF SLASH ONLY "/"
                // if (menu[i].id === 11 && menu[i].path === "product") {
                if (menu[i].id === 2 && menu[i].path === "product") {
                    dataMenu.items.push(transactionSuperadmin);
                    dataMenu.items.push(daftarStaffSuperadmin);
                    dataMenu.items.push(buatStaffBaruSuperadmin);
                    dataMenu.items.push(daftarProdukSuperadmin);
                    dataMenu.items.push(buatProdukBaruSuperadmin);
                    
                };

            }
            //#MANAJEMEN USER ATAU PENGATURAN KASIR/OWNER
            else if(split[1] === "Kasir/Owner" && level.name === "Superadmin"){

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                //DAFTAR KASIR/ OWNER **** DAFTAR USER
                let daftarKasirAndOwnerSuperadmin = {
                    name: `Daftar Kasir/Owner`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                //Buat Kasir/Owner Baru
                let buatKasirAndOwnerSuperadmin = {
                    name: `Buat Kasir/Owner Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/create-new-user` : 'null'}`
                };

                if (menu[i].id === 4 && menu[i].path === "user") {
                    dataMenu.items.push(daftarKasirAndOwnerSuperadmin);
                    dataMenu.items.push(buatKasirAndOwnerSuperadmin);
                };
            }
            //#MENU LAPORAN PENJUALAN Superadmin
            else if (split.length === 1 && split[0] === "Laporan" && level.name === "Superadmin") {

                //Laporan Superadmin
                let linkItem = { name: nameRouteReportSuperadmin, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : 'null'}` }

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

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
                    name: `${split[0]} Harian Kasir`,
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
            //#MENU LAPORAN PENJUALAN STORE OWNER
            else if (split.length === 1 && split[0] === "Laporan" && level.name === "Owner") {
                let linkItem = { name: nameRouteReportStore, path: `${this.props.match.url}${menu[i].path ? '/' + menu[i].path : 'null'}` }

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                if (menu[i].path !== "report") {
                    dataMenu.items.push(linkItem)
                };

                //Laporan Penjualan Owner
                let itemSeparatorReportSelling = {
                    name: `${split[0]} Harian`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                if (menu[i].group === "all" && menu[i].path === "report") {
                    dataMenu.items.push(itemSeparatorReportSelling);
                };

                //Laporan Menu
                let laporanMenu = {
                    name: `${split[0]} Menu`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/report-menu` : 'null'}`
                }

                if (menu[i].group === "all" && menu[i].path === "report") {
                    dataMenu.items.push(laporanMenu);
                }
            }
            
            //# Features of KASIR
            else if (split[0] === "Kasir" && level.name === "Kasir") {

                dataMenu = {
                    category: nameCategory,
                    items: []
                };
                
                //#Buat Member Baru - KASIR
                let kartuBaruNew = {
                    name: `Buat Member Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/kartu-baru-new` : 'null'}`
                };
                
                //#Isi Ulang - KASIR
                let isiUlangKasir = {
                    name: `Isi Ulang`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/topup` : 'null'}`
                };

                //#Refund - KASIR
                let refundKasir = {
                    name: `Refund`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/refund` : 'null'}`
                };

                //#Check Saldo - KASIR
                let checkSaldoKasir = {
                    name: `Cek Saldo`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/balance` : 'null'}`
                };

                //#Tulis Kartu Baru - KASIR
                let stockKartuBaru = {
                    name: `Tulis Kartu Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/stock-kartu` : 'null'}`
                };

                
                
                if (menu[i].group === "kasir") {
                    dataMenu.items.push(kartuBaruNew);
                    dataMenu.items.push(isiUlangKasir);
                    dataMenu.items.push(refundKasir);
                    dataMenu.items.push(checkSaldoKasir);
                    dataMenu.items.push(stockKartuBaru);
                };
            } 
            //# Features of KASIR - Laporan
            else if (split[0] === "Laporan" && level.name === "Kasir") {

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                //#Laporan Harian Kasir
                let laporanHarianKasir = {
                    name: `Laporan Harian Kasir`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}` : 'null'}`
                };

                if (menu[i].group === "all" && menu[i].path === "report") {
                    dataMenu.items.push(laporanHarianKasir);
                };
            }

            //#MANAJEMEN STORE OWNER - TRANSAKSI/ PENJUALAN, DAFTAR STAFF, BUAT STAFF BARU, DAFTAR PRODUK, BUAT PRODUK BARU,  
            else if(split[0] === "Toko" && level.name === "Owner"){ 

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                let penjualanOwner = {
                    name: `Penjualan`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/transaction` : 'null'}`
                };

                let daftarStaffInOwner = {
                    name: `Daftar Staff`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/staff` : 'null'}`
                };

                let buatStaffBaruInOwner = {
                    name: `Buat Staff Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/create-new-staff` : 'null'}`
                };

                let daftarProductOwner = {
                    name: `Daftar Produk`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/` : 'null'}`
                };

                let buatProductBaruOwner = {
                    name: `Buat Produk Baru`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/create-new-product` : 'null'}`
                };

                if (menu[i].group === "store") {
                    dataMenu.items.push(penjualanOwner);
                    dataMenu.items.push(daftarStaffInOwner);
                    dataMenu.items.push(buatStaffBaruInOwner);
                    dataMenu.items.push(daftarProductOwner);
                    dataMenu.items.push(buatProductBaruOwner);
                   
                };
            }

            //#STORE STAFF
            else if(split[0] === "Transaksi" && level.name === "Staff"){

                dataMenu = {
                    category: nameCategory,
                    items: []
                };

                //TRANSAKSI/ PENJUALAN STORE STAFF
                let transactionPenjualan = {
                    name: `Penjualan`,
                    path: `${this.props.match.url}${menu[i].path ? `/${menu[i].path}/` : 'null'}`
                };

                if (menu[i].name === "Transaksi" && menu[i].path === "transaction") {
                    dataMenu.items.push(transactionPenjualan);
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
        });
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