import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropsRoute } from '../../../components/Route';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';

import { getVendorEmployeeList, updateVendorEmployee, changeEmployeeStatus } from '../../../actions/vendor.action';
import { getStoreList } from '../../../actions/store.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { getAccessList } from '../../../actions/access.action';
import { AdminStoresEmployeeSuperAdmView } from '../AdminStoresEmployeeSuperAdm';
import MySearchFieldAccess from '../../../components/Input/MySearchFieldAccess';

function mapStateToProps(state) {
    return {
        store: state.store,
        vendorState: state.vendorState,
        access: state.access,
        dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getVendorEmployeeListDispatch: (data) => dispatch(getVendorEmployeeList(data)),
        getStoreListDispatch: () => dispatch(getStoreList()),
        getAccessListDispatch: (data) => dispatch(getAccessList(data)),
        action: bindActionCreators({ updateVendorEmployee, openDialog, closeDialog, getVendorEmployeeList, changeEmployeeStatus }, dispatch)
    }
}

class AdminStoresEmployeeSuperAdm extends Component {

    constructor(){
        super();
        this.toggleModal = this.toggleModal.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.openVendorEmployeeModal = this.openVendorEmployeeModal.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.handleUpdateSubmitStoreStaff = this.handleUpdateSubmitStoreStaff.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderDialogModalStatusOke = this.renderDialogModalStatusOke.bind(this);
        this.handleChangeEmployeeStatus = this.handleChangeEmployeeStatus.bind(this);
     
        this.state = {

            search: {
                searchText: '',
                searchBy: 'name'
            },
            table: {
                columns: [],
                rows: [],
                limit: 10,
                searchParams: [
					{ accessor: 'name', name: 'Nama Staff' }
				]
            },  
            isModalOpen: {
                modalUpdateStaff: false
            },
            storeActiveList : {},
            storeStaffList: {},
            selectedStaff: {}

        }

        this.optionsPagination = {
            prePage:'Prev',
            nextPage:'Next',
            firstPage: '.', // First page button text
            lastPage: '.', // Last page button text
            sortIndicator: true,
            noDataText: 'Nama Staff tidak di temukan',
            searchField: (props) => (<MySearchFieldAccess { ...props } name="Cari berdasarkan nama staff atau email"/>),
            hideSizePerPage: true,
            searchPosition: 'left'
            // onRowDoubleClick: function(row) {
            //     props.toggle();
            // }
        };
    }

    componentDidMount = () => {
        const {getStoreListDispatch, getAccessListDispatch} = this.props;
        getStoreListDispatch();
      
        let requiredData = {
            active : true
        }

        getAccessListDispatch(requiredData);

        //#
        this.populateTableData();
    }

    componentDidUpdate = (prevProps) => {
        const{ store, vendorState, access } = this.props;

        //#GET STORE LIST
        if(prevProps.store.list !== store.list){   
            if(store.list.isLoaded){
                this.setState({  
                    ...this.state,
                    storeActiveList: store.list.isLoaded ? store.list.data.data.result.store : null
                }, () => {
                    // console.log(this.state);

                });
            }
        }

        //#GET STORE STAFF
        if(prevProps.vendorState.employee !== vendorState.employee){
            if(vendorState.employee.isLoaded){
                this.setState({  
                    ...this.state,
                    storeStaffList: vendorState.employee.isLoaded ? vendorState.employee.data.data.result : null
                }, () => {
                     this.populateTableData();
                });
            }
        }

        if(prevProps.vendorState.statusEmployee !== vendorState.statusEmployee) {
            if(vendorState.statusEmployee.isStatusChanging) {
                vendorState.employee.data.data.result.staff.map((item) => {
                    item.statusChanging = true;
                    this.forceUpdate();
                })
            }

            if(vendorState.statusEmployee.isStatusChanged) {
                vendorState.employee.data.data.result.staff.map((item) => {
                    if (item.id === vendorState.statusEmployee.id) {
                            item.statusChanging = false;

                            if(item.status) {
                                item.status = false;
                            } 
                            else {
                                item.status = true;
                            }

                            this.forceUpdate();
                    }
                })
            }

             //#Get All Access List
            if(prevProps.access.list !== access.list){
                if(access.list.isLoaded){

                    this.setState({
                        ...this.state,
                        accessLevel: access.list.data.result
                    }, () => {
                        // console.log(this.state);
                    })
                    
                }
            }
        }
    };

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
        const { dialog, action } = this.props;

        if(!dialog.isOpened) {
            action.openDialog(data);
        } else {
            action.closeDialog();
        }
    }

    renderDialogModalStatusOke = () => {
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

    handleCancelModal = (e) => {
        e.preventDefault();
        const {isModalOpen} = this.state;

        this.setState({
            ...this.state,
            isModalOpen:{
                modalUpdateStaff:false
            }
        });
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

    openVendorEmployeeModal = (row) => {
        this.setState({
            ...this.state,
            // selectedVendorEmployee : row.data
            selectedStaff: row

        }, () => {
            this.toggleModal('modalUpdateStaff')
        });
    };

    //#
    handleClickChange = (e) => {

        const target = e.target;
        const name = target.name;
        const value = target.value;

        // console.log(value);
        let requireData = {
            id : value
        };

        const { getVendorEmployeeListDispatch } = this.props;
        getVendorEmployeeListDispatch(requireData);
    }


    //#
    populateTableData = () => {

        const { vendorState } = this.props;

        const columns = [
            {
                title: 'Nama Staff',
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
                        <Button className="margin-right-small" type="button" onClick={() => this.openVendorEmployeeModal(row)}>Ubah</Button>
                        <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.handleChangeEmployeeStatus(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
                    </td>
                )
            }
        ]

        const rows = [];

        if (vendorState.employee.isLoaded) {

            vendorState.employee.data.data.result.staff.forEach((employee, i) => {
                let row = {
                    id: employee.id,
                    name: employee.name,
                    username: employee.username,
                    email: employee.email,
                    level: employee.level.id,
                    status: employee.status,
                    password: employee.password,
                    data: employee
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

    handleUpdateSubmitStoreStaff = (e) => {
        e.preventDefault();
        const { selectedStaff} = this.state;
        const { vendorState, updateVendorEmployee, action} = this.props;

        if(selectedStaff.password === selectedStaff.passwordConfirm){

            let requireDataUpdate = {
                id : selectedStaff.id,
                name: selectedStaff.name,
                username: selectedStaff.username,
                email: selectedStaff.email,
                level: selectedStaff.level,
                password: selectedStaff.password
            };

            action.updateVendorEmployee(requireDataUpdate).then(() => {

                if(this.props.vendorState.updateEmployee.isUpdated){
            
                    let dialogData = {
                        type: 'success',
                        title: 'Berhasil',
                        message: 'Update staff telah berhasil diubah. Klik tombol berikut untuk kembali.',
                        onClose: () => window.location.reload(),
                        closeText: 'Kembali'
                    }
                    this.toggleDialog(dialogData);
                    
                }

                if(this.props.vendorState.updateEmployee.isError){
                    
                    let dialogData = {
                        type: 'danger',
                        title: 'Gagal',
                        message: 'Staff gagal diubah. Klik tombol berikut untuk kembali.',
                        onClose: () => this.toggleDialog(),
                        closeText: 'Kembali'
                    }
                    this.toggleDialog(dialogData);  
                }
            })

        } else {
            console.log("Password tidak sama");
            alert("Ulangi ketik Password! Password tidak sama");
        }
    };

    handleChangeEmployeeStatus = (row) => {
        const { action } = this.props;

        let requiredData = {
              id: row.id
        }

        action.changeEmployeeStatus(requiredData);
    }



    render() {
        const { store } = this.props;
        const { activeTab } = this.state;

        return (
            <div>
                <AdminStoresEmployeeSuperAdmView 
                    toggleModal={this.toggleModal}
                    handleClickChange = { this.handleClickChange}
                    handleCancelModal= { this.handleCancelModal}
                    handleUpdateSubmitStoreStaff = { this.handleUpdateSubmitStoreStaff}
                    handleInputChange={this.handleInputChange}
                    // populateTableData = {this.populateTableData}
                    optionsPagination={this.optionsPagination}
                    {...this.state} 
                    {...this.props} />

                    { this.renderDialogModalStatusOke()}
            </div>
        ) 

    }
}

// export default AdminStoresEmployeeSuperAdm;
export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresEmployeeSuperAdm);