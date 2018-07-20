import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropsRoute } from '../../../components/Route';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';


import { getMenuStoreList, updateMenuVendor, changeMenuStatus } from '../../../actions/vendor.action';
import { getStoreList } from '../../../actions/store.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';

import { AdminStoresMenuSuperAdmView } from '../AdminStoresMenuSuperAdm';
import MySearchFieldAccess from '../../../components/Input/MySearchFieldAccess';

function mapStateToProps(state) {
    return {
        store: state.store,
        vendorState: state.vendorState,
        // access: state.access,
        dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // getVendorEmployeeListDispatch: (data) => dispatch(getVendorEmployeeList(data)),
        getStoreListDispatch: () => dispatch(getStoreList()),
        getMenuStoreListDispatch : (data) => dispatch(getMenuStoreList(data)),
        // getAccessListDispatch: (data) => dispatch(getAccessList(data)),
        action: bindActionCreators({ updateMenuVendor, openDialog, closeDialog, changeMenuStatus  }, dispatch)
    };
};


class AdminStoresMenuSuperAdm extends Component {

    constructor(){
        super();
        this.handleClickChange = this.handleClickChange.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.openModalMenuProductStore = this.openModalMenuProductStore.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleUpdateMenuProductSubmit = this.handleUpdateMenuProductSubmit.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
        this.handleChangeMenuStatus = this.handleChangeMenuStatus.bind(this);

        this.state = {

            storeActiveList : {},
            storeMenuList : {},
            table: {
                columns: [],
                rows: [],
                limit: 10,
                searchParams: [
					{ accessor: 'name', name: 'Nama Produk' }
				]
            },
            selectedMenuStore:{},
            isModalOpen:{
                modalUpdateMenuProductStore: false
            },
        };

        this.optionsPagination = {
            prePage:'Prev',
            nextPage:'Next',
            firstPage: '.', // First page button text
            lastPage: '.', // Last page button text
            sortIndicator: true,
            noDataText: 'Nama Staff tidak di temukan',
            searchField: (props) => (<MySearchFieldAccess { ...props } name="Cari berdasarkan nama produk, deskripsi produk atau harga"/>),
            hideSizePerPage: true,
            searchPosition: 'left'
            // onRowDoubleClick: function(row) {
            //     props.toggle();
            // }
        };
    };

    componentDidMount = () => {
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();

        // let requireData = {
        //     id : 10
        // };

        // // console.log(requireData);
        // const { getMenuStoreListDispatch } = this.props;
        // getMenuStoreListDispatch(requireData);

    };

    componentDidUpdate(prevProps){
        const { store, vendorState, access } = this.props;
        const { storeMenuList } = this.state;

        //#GET STORE LIST
        if(prevProps.store.list !== store.list){   
            if(store.list.isLoaded){
                this.setState({  
                    ...this.state,
                    storeActiveList: store.list.isLoaded ? store.list.data.data.result.store : null
                }, () => {
                    // console.log(this.state.storeActiveList);
                });
            }
        }

        //Get menu store based on ID STORE
        if(prevProps.vendorState.storemenu !== vendorState.storemenu){
            if(vendorState.storemenu.isLoaded){
                
                this.setState({
                    ...this.state,
                    // storeMenuList: vendorState.storemenu.isLoaded ? vendorState.storemenu.data.data.result.menu : null
                    storeMenuList: vendorState.storemenu
                },() => {
                    // console.log(this.state.storeMenuList);
                    this.populateTableData();
                })
            }
        }

        //Chage Status Aktif - Non Aktif Menu Produk

        if(prevProps.vendorState.status !== vendorState.status) {
            if(vendorState.status.isStatusChanging) {
                storeMenuList.data.data.result.menu.map((item) => {
                    item.statusChanging = true;
                    this.forceUpdate();
                })
            }

            if(vendorState.status.isStatusChanged) {
                storeMenuList.data.data.result.menu.map((item) => {
                    if (item.id === vendorState.status.id) {
                            item.statusChanging = false;

                            if(item.status) {
                            item.status = false;
                            } 
                            else {
                            item.status = true;
                            }

                            this.forceUpdate();
                    }
                })
            }
        }
    };

    //#
    toggleModal = (name) => {
        const { isModalOpen } = this.state;
        this.setState({
            ...this.state,
            isModalOpen: {
                [name]: !isModalOpen[name]
            }
        })
    }

    //#
    renderDialog = () => {
        const { dialog, toggleDialog } = this.props;
        
        return (
              <Dialog
                    isOpen={dialog.isOpened}
                    toggle={toggleDialog}
                    type={dialog.data.type}
                    title={dialog.data.title}
                    message={dialog.data.message}
                    onConfirm={dialog.data.onConfirm}
                    confirmText={dialog.data.confirmText}
                    onClose={dialog.data.onClose}
                    closeText={dialog.data.closeText}
              />
        )
    }

    //#
    toggleDialog = (data) => {
        const {
            dialog,
            action
        } = this.props;

        if(!dialog.isOpened) {
            action.openDialog(data);
        } else {
            action.closeDialog();
        }
    }

    handleCancelModal = (e) =>{

        e.preventDefault();
        const {isModalOpen} = this.state;

        this.setState({
            ...this.state,
            isModalOpen:{
                modalUpdateMenuProductStore:false
            }
        });
    }
    //#
    handleClickChange = (e) => {

        e.preventDefault();
        const target = e.target;
        const name = target.name;
        const value = target.value;

        // console.log(value);
        let requireData = {
            id : value
        };

        // console.log(requireData);
        const { getMenuStoreListDispatch } = this.props;
        getMenuStoreListDispatch(requireData);
    }

    openModalMenuProductStore = (row) => {        
        this.setState({
            ...this.state,
            selectedMenuStore : row

        }, () => {
            this.toggleModal('modalUpdateMenuProductStore')
        })
    }

    handleChangeMenuStatus = (row) => {
        const {
              action
        } = this.props;

        let requiredData = {
              id: row.id
        }

        action.changeMenuStatus(requiredData);
    }

    populateTableData = () => {

        const { storeMenuList, storeList  } = this.state;  
        const { vendorState } = this.props;

        const columns = [
            {
                title: 'Nama Produk',
                accessor: 'name'
            },
            {
                title: 'Deskripsi Produk',
                accessor: 'description'
            },
            {
                title: 'Harga',
                accessor: 'price',
                isCurrency: true
            },
            {
                title: 'Aksi',
                accessor: 'action',
                render: (row) => (
                    <td>
                        <Button className="margin-right-small" type="button" onClick={() => this.openModalMenuProductStore(row)}>Ubah</Button>
                        <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.handleChangeMenuStatus(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
                    </td>
                )
            }
        ];

        const rows = [];

        if(vendorState.storemenu.isLoaded){
            vendorState.storemenu.data.data.result.menu.map((menu, i)=> {

                let row = {
                    id: menu.id,
                    description:menu.description,
                    name: menu.name,
                    price: menu.price,
                    image: menu.image,
                    status: menu.status,
                    category: menu.category,
                    data: menu
                }
                rows.push(row);
            });
        }
      
        
        this.setState({
            ...this.state,
            table: {
                ...this.state.table,
                columns: columns,
                rows: rows
            }
        }, ()=> {
            // console.log(this.state);
        }) 
    }

    //#
    handleInputChange = (object, e) => {

        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            ...this.state,
            [object]: {
                ...this.state[object],
                [name]: value
            }
        });
    } 

    //#
    handleUpdateMenuProductSubmit = (e) =>{

        e.preventDefault();

        //#
        const {selectedMenuStore,isModalOpen } = this.state;
        const {updateVendorMenuState,vendorState, action} = this.props;

        const rowsUpdate = [];

        let requireDataUpdate = {
            id : selectedMenuStore.id,
            name: selectedMenuStore.name,
            description: selectedMenuStore.description,
            price: parseInt(selectedMenuStore.price.replace(/,/g, '')),
            image: selectedMenuStore.image,
            category: selectedMenuStore.category
        };

        console.log(requireDataUpdate);
        
        //#
        action.updateMenuVendor(requireDataUpdate).then(() => {
            
            const { vendorState } = this.props;

            if(vendorState.menuUpdate.isUpdated){
                let dialogData = {
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Produk telah berhasil diubah. Klik tombol berikut untuk kembali.',
                    onClose: () => window.location.reload(),
                    closeText: 'Kembali'
                }
      
                this.toggleDialog(dialogData);
            }

            if (vendorState.menuUpdate.isError) {
                let dialogData = {
                      type: 'danger',
                      title: 'Gagal',
                      message: 'Produk gagal diubah. Klik tombol berikut untuk kembali.',
                      onClose: () => this.toggleDialog(),
                      closeText: 'Kembali'
                }
        
                this.toggleDialog(dialogData);
          }
        });
    }


    render(){

        return (
            <div>
                <AdminStoresMenuSuperAdmView 
                    handleClickChange = {this.handleClickChange}
                    toggleModal= {this.toggleModal}
                    handleUpdateMenuProductSubmit = { this.handleUpdateMenuProductSubmit}
                    handleCancelModal = { this.handleCancelModal}
                    handleInputChange = { this.handleInputChange}
                    openModalMenuProductStore = {this.openModalMenuProductStore}
                    handleChangeMenuStatus = { this.handleChangeMenuStatus}
                    optionsPagination={this.optionsPagination}
                    {...this.props} 
                    {...this.state} 
                />

                {/*  RENDER DIALOG BERHASIL OR NOT */}
                {this.renderDialog()}
            </div>
        )
    }

}

// export default AdminStoresMenuSuperAdm;
export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresMenuSuperAdm);