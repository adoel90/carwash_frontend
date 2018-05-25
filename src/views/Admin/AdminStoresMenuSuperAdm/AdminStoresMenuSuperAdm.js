import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropsRoute } from '../../../components/Route';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';

import { AdminStoresMenuSuperAdmView } from '../AdminStoresMenuSuperAdm';

import { getMenuStoreList } from '../../../actions/vendor.action';
import { getStoreList } from '../../../actions/store.action';


function mapStateToProps(state) {
    return {
        store: state.store,
        vendorState: state.vendorState,
        // access: state.access,
        // dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // getVendorEmployeeListDispatch: (data) => dispatch(getVendorEmployeeList(data)),
        getStoreListDispatch: () => dispatch(getStoreList()),
        getMenuStoreListDispatch : (data) => dispatch(getMenuStoreList(data))
        // getAccessListDispatch: (data) => dispatch(getAccessList(data)),
        // action: bindActionCreators({ updateVendorEmployee, openDialog, closeDialog, getVendorEmployeeList, changeEmployeeStatus }, dispatch)
    }
}


class AdminStoresMenuSuperAdm extends Component {

    constructor(){
        super();
        this.handleClickChange = this.handleClickChange.bind(this);
        this.populateTableData = this.populateTableData.bind(this);

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
        }
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
        const{ store, vendorState, access } = this.props;

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
                },()=>{
                    console.log(this.state.storeMenuList);
                    this.populateTableData();
                })
            }
        }
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
                        <Button className="margin-right-small" type="button" onClick={() => this.openMenuVendorModal(row)}>Ubah</Button>
                        {/* <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changeMenuStatus(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button> */}
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

    render(){

        return (
            <div>
                <AdminStoresMenuSuperAdmView 
                    handleClickChange = {this.handleClickChange}
                    {...this.state} 
                    {...this.props} 
                />
            </div>
        )
    }

}

// export default AdminStoresMenuSuperAdm;
export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresMenuSuperAdm);