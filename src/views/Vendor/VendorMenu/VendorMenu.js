import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VendorMenuView} from '../VendorMenu';
import { getStoreList, updateMenuVendor, getMenuStoreList } from '../../../actions/vendor.action';

function mapStateToProps(state) {
    return {
        vendorState : state.vendorState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        updateVendorMenuState: (object) => dispatch(updateMenuVendor(object)),
        getMenuStoreListDispatch: (data) => { dispatch(getMenuStoreList(data))}
    }
}

class VendorMenu extends Component {

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
                    // console.log(this.state);
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
            console.log(this.state);
            
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
                // render: (data) => (
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

        console.log(row);
        
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

    handleUpdateSubmitVendorMenu = (e)=>{

        e.preventDefault();

        //#
        const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
        const dataVendorLoginNow = JSON.parse(userLoginNow);

        //#
        const {selectedMenuStore,isModalOpen } = this.state;
        const {updateVendorMenuState,vendorState} = this.props;

        const rowsUpdate = [];

        let requireDataUpdate = {
            id : selectedMenuStore.id,
            name: selectedMenuStore.name,
            description: selectedMenuStore.description,
            price: selectedMenuStore.price ,
            // cafe: selectedMenuStore.vendor
            image:selectedMenuStore.image,
            status:selectedMenuStore.status
        };
        
        console.log(requireDataUpdate);
        
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