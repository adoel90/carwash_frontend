import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { VendorEmployeeView } from '../VendorEmployee';
import { AdminStoresEmployeeView } from '../AdminStoresEmployee';
import { getVendorEmployeeList, updateVendorEmployee } from '../../../actions/vendor.action';
import { getStoreList } from '../../../actions/vendor.action';

function mapStateToProps(state) {
    return {
        vendorState: state.vendorState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getVendorState: (data) => dispatch(getVendorEmployeeList(data)),
        updateVendorEmployeeState: (object) => dispatch(updateVendorEmployee(object)),
        getStoreListDispatch: () => dispatch(getStoreList())
    }
}

class AdminStoresEmployee extends Component {

    constructor() {
        super();
        this.getVendorEmployeeList = this.getVendorEmployeeList.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openVendorEmployeeModal = this.openVendorEmployeeModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateSubmitVendorEmployee = this.handleUpdateSubmitVendorEmployee.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.getStoreList = this.getStoreList.bind(this);

        this.state = {
            vendorEmployee: {},
            vendorEmployeeList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            isModalOpen: {
                updateVendorEmployee: false
            },
            selectedVendorEmployee: {},
            storeList:{},
            storeActive: 0
        }
    }

    componentDidMount = () => {
        this.getVendorEmployeeList();
        this.getStoreList();
    }

    getVendorEmployeeList = () => {
        /* Only declare this function so that NOT ERROR */
    }

    getStoreList = () => {
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
    }

    componentDidUpdate = (prevProps) => {
        const { vendorState, storeMenuList, getVendorState } = this.props;
        const { storeActive } = this.state;

        if(prevProps.vendorState.store !== vendorState.store){
            if(vendorState.store.isLoaded){
                this.setState({
                    ...this.state,
                    storeList: vendorState.store.data.data.result.store
                }, ()=> {
                    getVendorState(vendorState.store.data.data.result.store[storeActive]);
                })  
            }
        } 

        if (prevProps.vendorState.employee !== vendorState.employee) {
            if(vendorState.employee.isLoaded){
                this.setState({
                    ...this.state,
                    vendorEmployeeList: vendorState.employee
                }, () => {
                    this.populateTableData();
                });
            }           
        }

        if(prevProps.vendorState.existing !== vendorState.existing ){
            if(vendorState.existing.isUpdated){
                console.log("UPDATED !!!");
                
            }
        }
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

        const rows = [];
        if (vendorEmployeeList.isLoaded) {
            vendorEmployeeList.data.data.result.staff.forEach((employee, i) => {
                let row = {
                    id: employee.id,
                    name: employee.name,
                    username: employee.username,
                    email: employee.email,
                    level: employee.level,
                    status: employee.status,
                    password: employee.password
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
        this.setState({
            ...this.state,
            // selectedVendorEmployee : row.data
            selectedVendorEmployee: row

        }, () => {
            this.toggleModal('updateVendorEmployee')
        })
    }

    handleUpdateSubmitVendorEmployee = (e) => {
        e.preventDefault();
        const { selectedVendorEmployee } = this.state;
        const { updateVendorEmployeeState } = this.props;

        if(selectedVendorEmployee.password === selectedVendorEmployee.passwordConfirm){

            let requireDataUpdate = {
                id : selectedVendorEmployee.id,
                name: selectedVendorEmployee.name,
                username: selectedVendorEmployee.username,
                email: selectedVendorEmployee.email,
                level: selectedVendorEmployee.level.id,
                status: selectedVendorEmployee.status,
                password: selectedVendorEmployee.password
            };

            updateVendorEmployeeState(requireDataUpdate);

            this.setState({
                ...this.state,
                isModalOpen: {
                    updateMenuVendor:false
                }
            })
        } else {
            console.log("Password tidak sama");
            alert("Ulangi ketik Password! Password tidak sama");
        }
    }

    handleCancelModal = (e) => {
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
            <AdminStoresEmployeeView
                {...this.state}
                {...this.props}
                toggleModal={this.toggleModal}
                handleInputChange={this.handleInputChange}
                handleUpdateSubmitVendorEmployee={this.handleUpdateSubmitVendorEmployee}
                handleCancelModal= {this.handleCancelModal}
            />
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresEmployee);