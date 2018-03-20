import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorMenuView} from '../VendorMenu';
import { getMenuVendorList, updateMenuVendor, getMenuStoreList } from '../../../actions/vendor.action';
import { getStoreList } from '../../../actions/store.action';

function mapStateToProps(state) {

    return {
        vendorState : state.vendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorState: () => dispatch(getMenuVendorList()),
        updateVendorMenuState: (object) => dispatch(updateMenuVendor(object)),
        getMenuStoreListDispatch: (data) => { dispatch(getMenuStoreList(data))}
        
    }
}

class VendorMenu extends Component {

    constructor(){

        super();
        this.getMenuVendorList = this.getMenuVendorList.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openMenuVendorModal = this.openMenuVendorModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateSubmitVendorMenu = this.handleUpdateSubmitVendorMenu.bind(this);
        this.populateTableData= this.populateTableData.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);

        this.getMenuStoreList = this.getMenuStoreList.bind(this);
        this.getId = this.getId.bind(this);

        this.state = {

            menuVendor: {},
            menuVendorList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            isModalOpen:{
                updateMenuVendor: false
            },
            selectedMenuVendor:{},

            storeList:{},
            storeProductList:{}
        }
    }

    componentDidMount = () => {

        this.getMenuVendorList();
        // this.getMenuStoreList();

    }

    getMenuVendorList = () => {

        const { getVendorState } = this.props;

        getVendorState();
    }

    //#
    getMenuStoreList = () => {
        const { getMenuStoreListDispatch, storeList, vendorState } = this.props;

        let dataStoreArrayObject = vendorState.menu.isLoaded ? vendorState.menu.data.data.result.store : null;
     

        if(this.props.vendorState.menu.isLoaded){
            dataStoreArrayObject.map((item)=> {
                getMenuStoreListDispatch(item.id);
            })
        }
  
    }

    componentDidUpdate = (prevProps) => {

        const { vendorState } = this.props;

        if(prevProps.vendorState.menu !== vendorState.menu) {


            
            this.setState({
                ...this.state,
                storeList: vendorState.menu //INI MESTI LO GANTI JADI MENU STORE BENERAN (YANG SEKARANG MASIH DATA SI STORE)

            }, () => {
                // this.populateTableData();
                this.getId();
            });
        }

        // console.log(prevProps);
        
    }

    getId = () => {
        // console.log("Oke");
        this.getMenuStoreList();
        
    }

    populateTableData = () => {

        const { storeList } = this.state;  
        
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
                // render: (data) => (
                render: (row) => (
                    <td>
                        <a href="#" onClick={() => this.openMenuVendorModal(row)}>Ubah</a>
                    </td>
                )
            }
        ]

        const rows = []; 

        if(storeList.isLoaded) {

            storeList.data.data.result.store.map((menu, i)=>{

                let row = {
                    id:menu.id,
                    name: menu.name,
                    description: menu.description,
                    price: menu.price,
                    data: menu
                }

                rows.push(row);
            })
   
        };

        this.setState({
            ...this.state,
            table: {
                ...this.state.table,
                columns: columns,
                rows: rows
            }
        }) 
    }

    toggleModal = (name) => {

        const { isModalOpen } = this.state;
        
        this.setState({
            ...this.state,
            isModalOpen: {
                [name]: !isModalOpen[name]
            }
        })
    }

    openMenuVendorModal = (row) => {

        this.setState({
            ...this.state,
            selectedMenuVendor : row.data

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

    handleUpdateSubmitVendorMenu = (e)=>{

        e.preventDefault();
        
        //#
        const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
        const dataVendorLoginNow = JSON.parse(userLoginNow);

        //#
        const {selectedMenuVendor,isModalOpen } = this.state;
        const {updateVendorMenuState,vendorState} = this.props;

        const rowsUpdate = [];

        let requireDataUpdate = {
            id : selectedMenuVendor.id,
            name: selectedMenuVendor.name,
            description: selectedMenuVendor.description,
            price: selectedMenuVendor.price ,
            cafe: dataVendorLoginNow.vendor
        };

        updateVendorMenuState(requireDataUpdate);
        
        rowsUpdate.push(requireDataUpdate);
     
            this.setState({
                ...this.state,
                table:{
                    ...this.state.table,
                    rows:rowsUpdate
                },
                isModalOpen: {

                    updateMenuVendor: false
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
            <VendorMenuView
                {...this.state}
                {...this.props}
                toggleModal= {this.toggleModal}
                handleInputChange= {this.handleInputChange}
                handleUpdateSubmitVendorMenu={this.handleUpdateSubmitVendorMenu}
                handleCancelModal={this.handleCancelModal}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorMenu);