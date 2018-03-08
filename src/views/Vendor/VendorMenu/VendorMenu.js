import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorMenuView} from '../VendorMenu';
import { getMenuVendorList, updateMenuVendor } from '../../../actions/vendor.action';

function mapStateToProps(state) {
    return {
        vendorState : state.vendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorState: () => dispatch(getMenuVendorList()),
        updateVendorMenuState: (object) => dispatch(updateMenuVendor(object))
        
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
            selectedMenuVendor:{}
        }

        
    }

    componentDidMount = () => {

        this.getMenuVendorList();

    }

    getMenuVendorList = () => {

        const { getVendorState } = this.props;

        getVendorState();
    }

    componentDidUpdate = (prevProps) => {
        const { vendorState } = this.props;

        if(prevProps.vendorState.menu !== vendorState.menu) {
            this.setState({
                ...this.state,
                menuVendorList: vendorState.menu

            }, () => {
                this.populateTableData();
            });
        }
    }

    populateTableData = () => {

        const { menuVendorList } = this.state;   
         
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

        if(menuVendorList.isLoaded) {
            menuVendorList.data.data.result.map((menu, i)=>{

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
        const {updateVendorMenuState} = this.props;

        let requireDataUpdate = {
            id : selectedMenuVendor.id,
            name: selectedMenuVendor.name,
            description: selectedMenuVendor.description,
            price: selectedMenuVendor.price ,
            cafe: dataVendorLoginNow.vendor
        };

        // console.log(requireDataUpdate);
        updateVendorMenuState(requireDataUpdate);
        // console.log(this.state);

        this.setState({
            ...this.state,
            isModalOpen: {
                updateMenuVendor: false
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
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    // mapDispatchToPropsUpdate
)(VendorMenu);