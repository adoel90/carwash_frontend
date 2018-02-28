import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorMenuView} from '../VendorMenu';
import { getMenuVendorList } from '../../../actions/vendor.action';


function mapStateToProps(state) {
    
    return {
        vendorState : state.vendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorState: () => dispatch(getMenuVendorList())
    }
}

class VendorMenu extends Component {

    constructor(){

        super();
        this.getMenuVendorList = this.getMenuVendorList.bind(this);
        this.populateTableData= this.populateTableData.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openMenuVendorModal = this.openMenuVendorModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

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
            }
        }
    }

    componentDidMount = () => {

        this.getMenuVendorList();
    }

    getMenuVendorList = () => {

        // console.log(this.props);
        const { getVendorState } = this.props;

        getVendorState();
    }


    componentDidUpdate = (prevProps) => {
        const { vendorState } = this.props;

        // console.log(this.props);
        
        if(prevProps.vendorState.list !== vendorState.list) {
            this.setState({
                ...this.state,
                menuVendorList: vendorState.list
            }, () => {
                this.populateTableData();
            });
        }
        // console.log(this.props);
    }

    populateTableData = () => {

        const { menuVendorList } = this.state;   
         
        const columns = [
            {
                title: 'Menu',
                accessor: 'name'
            },
            {
                title: 'Detail Desc',
                accessor: 'description'
            },
            {
                title: 'Price',
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

        const rows = [] 
        
        if(menuVendorList.isLoaded) {
              
            menuVendorList.data.data.result.forEach((menu, i) => {

                let row = {
                    // id: menu.id,
                    name: menu.name,
                    description: menu.description,
                    price: menu.price,
                    data: menu
                }

                rows.push(row);
            })
        }

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

    render() {
        return (
            <VendorMenuView
                {...this.state}
                {...this.props}
                toggleModal= {this.toggleModal}
                handleInputChange= {this.handleInputChange}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorMenu);