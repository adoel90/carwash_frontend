import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dialog } from '../../../components/Dialog';
import { AdminStoresMenuView} from '../AdminStoresMenu';
import { getStoreList, updateMenuVendor, getMenuStoreList } from '../../../actions/vendor.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';

function mapStateToProps(state) {
    return {
        vendorState : state.vendorState,
        dialog : state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        // updateVendorMenuState: (object) => dispatch(updateMenuVendor(object)),
        getMenuStoreListDispatch: (data) => { dispatch(getMenuStoreList(data))},
        action: bindActionCreators({ updateMenuVendor, openDialog, closeDialog }, dispatch)
    }
}

class AdminStoresMenu extends Component {

    constructor(){

        super();
        this.toggleModal = this.toggleModal.bind(this);
        this.openMenuVendorModal = this.openMenuVendorModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateSubmitVendorMenu = this.handleUpdateSubmitVendorMenu.bind(this);
        this.populateTableData= this.populateTableData.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);

        this.getStoreList = this.getStoreList.bind(this);
        this.getMenuStoreList = this.getMenuStoreList.bind(this);
        this.getListIdStoreFromUserLogin = this.getListIdStoreFromUserLogin.bind(this);
        this.renderDialog = this.renderDialog.bind(this);

        this.handleImageChange = this.handleImageChange.bind(this);


        this.state = {

            // menuVendor: {},
            // menuVendorList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            isModalOpen:{
                updateMenuVendor: false
            },
            // selectedMenuVendor:{},
            selectedMenuStore:{},

            storeList:{},
            storeActiveList:{},
            idStore:[],
            storeActive: 0,
            storeMenuList:{}
        }
    }

    //#
    componentDidMount = () => {
        this.getStoreList();
    }

    getStoreList = () => {
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
    }

    //#
    getMenuStoreList = () => {
        /* Only declare this function so that NOT ERROR */
    }

    //#
    componentDidUpdate = (prevProps) => {

        const { vendorState, getMenuStoreListDispatch } = this.props;
        const { storeList, storeActive } = this.state;

        //Get store
        if(prevProps.vendorState.store !== vendorState.store) {   
            this.setState({
                ...this.state,
                storeList: vendorState.store 

            }, () => {
                // this.populateTableData();
                this.getListIdStoreFromUserLogin();
            });
        }

        //Get menu store based on id store
        if(prevProps.vendorState.store !== vendorState.store){
            if(vendorState.store.isLoaded){
                this.setState({
                    ...this.state,
                    storeActiveList: vendorState.store.data.data.result.store
                }, () => {
                    getMenuStoreListDispatch(vendorState.store.data.data.result.store[storeActive]);
                });
            }
        }
        
        //Populate Data based on id store 
        if(prevProps.vendorState.storemenu !== vendorState.storemenu){
            
            if(vendorState.storemenu.isLoaded){
                this.setState({
                    ...this.state,
                    storeMenuList: vendorState.storemenu.data.data.result.menu
                },()=>{
                    this.populateTableData();
                })
            }
        }

    }

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

    getListIdStoreFromUserLogin = () => {

        const { getStoreListDispatch } = this.props;
        const { storeList, dispatch } = this.state;

        const idObjects = [];
        if (storeList.isLoaded){
            storeList.data.data.result.store.map((data, i)=>{

                let idObject = {
                    id:data.id
                }

                idObjects.push(idObject)
            })
        }
        
        this.setState({
            ...this.state,
            idStore: idObjects
        }, ()=> {
            // console.log(this.state);
            
        })
    }

    populateTableData = () => {

        const { storeMenuList, storeList  } = this.state;  
    
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
                accessor: 'price'
            },    
            {
                title: 'Aksi',
                accessor: 'action',
                render: (row) => (
                    <td>
                        <a href="#" onClick={() => this.openMenuVendorModal(row)}>Ubah</a>
                    </td>
                )
            }
        ]

        const rows = [];
        storeMenuList.map((menu, i)=> {
            let row = {
                id: menu.id,
                description:menu.description,
                name: menu.name,
                price: menu.price,
                image: menu.image,
                status: menu.status

            }
            rows.push(row);
        });
        
        this.setState({
            ...this.state,
            table: {
                ...this.state.table,
                columns: columns,
                rows: rows
            }
        }) 
    }

    openMenuVendorModal = (row) => {        
        this.setState({
            ...this.state,
            // selectedMenuVendor : row.data
            selectedMenuStore : row

        }, () => {
            this.toggleModal('updateMenuVendor')
        })
    }

    handleInputChange = (object, e) => {

        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            ...this.state,
            [object]: {
                ...this.state[object],
                [name]: value
            }
        });
    }

    handleImageChange = (object, e) => {
		const target = e.target;
		const files = target.files;
		const name = target.name;

		let reader = new FileReader();
		let file = files[0];

        console.log(reader);

        // reader.readAsText(file);
        
		reader.onloadend = () => {

			if(object) {
				object['image'] = file;
                object['imagePreview'] = reader.result

				this.forceUpdate();
			}
		}

		reader.readAsDataURL(file);
	}

    handleUpdateSubmitVendorMenu = (e) =>{

        e.preventDefault();

        //#
        const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
        const dataVendorLoginNow = JSON.parse(userLoginNow);

        //#
        const {selectedMenuStore,isModalOpen } = this.state;
        const {updateVendorMenuState,vendorState, action} = this.props;

        const rowsUpdate = [];

        let requireDataUpdate = {
            id : selectedMenuStore.id,
            name: selectedMenuStore.name,
            description: selectedMenuStore.description,
            price: selectedMenuStore.price ,
            image:selectedMenuStore.image,
            // status:selectedMenuStore.status
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

    handleCancelModal = (e) =>{

        e.preventDefault();

        const {isModalOpen} = this.state;
        this.setState({
            ...this.state,
            isModalOpen:{
                updateMenuVendor:false
            }
        });
    }

  


    render() {
        return (
            <div>
                <AdminStoresMenuView
                    {...this.state}
                    {...this.props}
                    toggleModal= {this.toggleModal}
                    handleInputChange= {this.handleInputChange}
                    handleUpdateSubmitVendorMenu={this.handleUpdateSubmitVendorMenu}
                    handleCancelModal={this.handleCancelModal}
                    handleImageChange = {this.handleImageChange}
                />
                {this.renderDialog()}
            </div>

        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresMenu);