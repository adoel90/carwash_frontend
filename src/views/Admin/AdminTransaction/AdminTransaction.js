import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropsRoute } from '../../../components/Route';
import { AdminTransactionView } from '../AdminTransaction';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';
import { Button } from '../../../components/Button';

import { getStoreListWithIdUser, getMenuListStore } from '../../../actions/store.action';

function mapStateToProps(state) {
    return {
        // vendorState : state.vendorState,
        // dialog : state.dialog,
        store: state.store
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListWithIdUserDispatch: () => dispatch(getStoreListWithIdUser()),
        // getMenuStoreListDispatch: (data) => { dispatch(getMenuStoreList(data))},
        // action: bindActionCreators({ updateMenuVendor, openDialog, closeDialog, getMenuStoreList }, dispatch)
        action: bindActionCreators({ getMenuListStore }, dispatch)
    }
}

class AdminTransaction extends Component{
    
    constructor(){
        super();
        this.toggleTab = this.toggleTab.bind(this);
        this.populateTableData= this.populateTableData.bind(this);
        this.fireCheckbox = this.fireCheckbox.bind(this);

        this.state = {
            storeList: {},
            listMenuStore: {},
            storeIdTab: {},
            activeTab: 0,
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
        }
    }

    componentDidMount(){
        const { getStoreListWithIdUserDispatch } = this.props;
        getStoreListWithIdUserDispatch();
    }

    componentDidUpdate(prevprops){
        const { store } = this.props;

        //#Get list store id 
        if(prevprops.store.storelistspecial !== store.storelistspecial){
            if(store.storelistspecial.isLoaded){

                this.setState({
                    ...this.state,
                    storeList: store.storelistspecial
                }, () => {
                    // console.log(this.state);
                })
            }
        }

        //Get Menu List
        if(prevprops.store.storemenu !== store.storemenu){
            if(store.storemenu.isLoaded){
                this.setState({
                    ...this.state,
                    listMenuStore: store.storemenu
                }, () => {
                    console.log(this.state);
                })
            }
        }
    }

    //#
	toggleTab = (tabIndex, type) => {

        const { action } = this.props;
        let data = { id : type.id }

        action.getMenuListStore(data);

        this.setState({
            activeTab: tabIndex,
            storeIdTab: type
		}, () => {                       
            this.populateTableData();
        })
    }
    
    //#
    fireCheckbox = (row) => {
        console.log(row);
    }
    //#
    populateTableData = () => {

        const { listMenuStore, storeList  } = this.state;  
    
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
                        {/* <Button className="margin-right-small" type="button" onClick={() => this.openMenuVendorModal(row)}>Ubah</Button> */}
                        <input className="margin-right-small" type="checkbox" onClick={() => this.fireCheckbox(row)} />
                    </td>
                )
            }
        ]

        const rows = [];

        if(listMenuStore.isLoaded){
            listMenuStore.data.data.result.menu.map((menu, i)=> {
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

    render(){
        const { storeList, activeTab } = this.state;

         //#
         const renderTabContent = () => {

            if(storeList.isLoaded){
                if(storeList.data.data.result.store.length){

                    return storeList.data.data.result.store.map((type, i) => {

                        return (
                            <TabContent activeTab={activeTab} tabIndex={i}>            
                                <PropsRoute
                                    component={AdminTransactionView}
                                    type={type}
                                    {...this.props}
                                    {...this.state}
                                    // toggleModal= {this.toggleModal}
                                    // handleInputChange= {this.handleInputChange}
                                    // handleUpdateSubmitVendorMenu={this.handleUpdateSubmitVendorMenu}
                                    // handleCancelModal={this.handleCancelModal}
                                    // handleImageChange = {this.handleImageChange}
                                    toggleTab={this.toggleTab}
                                />
                            </TabContent>
                        )
                    })
                }
            }
        }

        return(
            <div>           
                <Nav tabs className="flex justify-content--space-between">
                    { storeList.isLoaded ? storeList.data.data.result.store.map((store, i) => (
                        <NavItem>
                            <NavTabLink active={activeTab === i} onClick={() => this.toggleTab(i, store)}>
                                <h2>{store.name}</h2>
                            
                            </NavTabLink>
                        </NavItem>
                    )) : null }
                </Nav>

                {/* RENDER CONTENT BASED ON ID STORE */}
                {renderTabContent()}

                {/*  RENDER DIALOG BERHASIL OR NOT */}
                {/* {this.renderDialog()} */}
            </div>

        )
    }
}

// export default AdminTransaction;
export default connect( mapStateToProps, mapDispatchToProps )(AdminTransaction);