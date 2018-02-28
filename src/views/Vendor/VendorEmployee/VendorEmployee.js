import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorEmployeeView } from '../VendorEmployee';
import { getVendorEmployeeList } from '../../../actions/vendor.action';

function mapStateToProps(state) {
    
    return {
        vendorState : state.vendorState
    };
}


function mapDispatchToProps(dispatch) {

    return {
        getVendorState: () => dispatch(getVendorEmployeeList())
    }
}

class VendorEmployee extends Component {

    constructor(){

        super();
        this.getVendorEmployeeList = this.getVendorEmployeeList.bind(this);
        this.populateTableData= this.populateTableData.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openVendorEmployeeModal = this.openVendorEmployeeModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {

            vendorEmployee: {},
            vendorEmployeeList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            isModalOpen:{
                updateVendorEmployee: false
            }
        }
    }

    componentDidMount = () => {

        this.getVendorEmployeeList();
    }

    getVendorEmployeeList = () => {

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
                vendorEmployeeList: vendorState.list
            }, () => {
                this.populateTableData();
            });
        }
        // console.log(this.props);
    }

    populateTableData = () => {

        const { vendorEmployeeList } = this.state;   
         
        const columns = [
            {
                title: 'ID',
                accessor: 'id'
            },
            {
                title: 'Nama Karyawan',
                accessor: 'name'
            },
            {
                title: 'Email ',
                accessor: 'email'
            },    
            {
                title: 'Aksi',
                accessor: 'action',
                // render: (data) => (
                render: (row) => (
                    <td>
                        <a href="#" onClick={() => this.openVendorEmployeeModal(row)}>Ubah</a>
                    </td>
                )
            }
    
        ]

        const rows = [] 
        
        if(vendorEmployeeList.isLoaded) {
              
            vendorEmployeeList.data.data.result.employee.forEach((employee, i) => {

                let row = {
                    id: employee.id,
                    name: employee.name,    
                    email: employee.email,
                    // price: employee.price,
                    // data: menu
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

    openVendorEmployeeModal = (row) => {

        console.log(row);
        this.setState({
            ...this.state,
            selectedVendorEmployee : row.data

        }, () => {
            this.toggleModal('updateVendorEmployee')
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
            <VendorEmployeeView
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
)(VendorEmployee);