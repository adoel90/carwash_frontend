import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorEmployeeView } from '../VendorEmployee';
import { getVendorEmployeeList, updateVendorEmployee } from '../../../actions/vendor.action';

function mapStateToProps(state) {

    return {
        vendorState: state.vendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorState: () => dispatch(getVendorEmployeeList()),
        updateVendorEmployeeState: (object) => dispatch(updateVendorEmployee(object))
    }
}

class VendorEmployee extends Component {

    constructor() {

        super();
        this.getVendorEmployeeList = this.getVendorEmployeeList.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.openVendorEmployeeModal = this.openVendorEmployeeModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateSubmitVendorEmployee = this.handleUpdateSubmitVendorEmployee.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
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
            selectedVendorEmployee: {}
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

        if (prevProps.vendorState.employee !== vendorState.employee) {
            this.setState({
                ...this.state,
                vendorEmployeeList: vendorState.employee
            }, () => {
                this.populateTableData();
            });
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
        console.log(e);

        if(selectedVendorEmployee.password === selectedVendorEmployee.passwordConfirm){

            let requireDataUpdate = {
                id : selectedVendorEmployee.id,
                name: selectedVendorEmployee.name,
                email: selectedVendorEmployee.email,
                access: selectedVendorEmployee.access ,
                password: selectedVendorEmployee.password
            };
            console.log(requireDataUpdate);
            updateVendorEmployeeState(requireDataUpdate);

        }else{
            console.log("Password tidak sama");
        }
    }

    render() {
        return (
            <VendorEmployeeView
                {...this.state}
                {...this.props}
                toggleModal={this.toggleModal}
                handleInputChange={this.handleInputChange}
                handleUpdateSubmitVendorEmployee={this.handleUpdateSubmitVendorEmployee}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorEmployee);