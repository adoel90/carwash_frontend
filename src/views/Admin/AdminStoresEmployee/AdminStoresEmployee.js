import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropsRoute } from '../../../components/Route';
import { TabContent } from '../../../components/Tab';
import { AdminStoresEmployeeView } from '../AdminStoresEmployee';
import { Button } from '../../../components/Button';
import { Dialog } from '../../../components/Dialog';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import MySearchField from '../../../components/Input/MySearchField';

import { getVendorEmployeeList, updateVendorEmployee, changeEmployeeStatus } from '../../../actions/vendor.action';
import { getStoreList } from '../../../actions/vendor.action';
import { getAccessList } from '../../../actions/access.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';

function mapStateToProps(state) {
    return {
        vendorState: state.vendorState,
        access: state.access,
        dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getVendorEmployeeListDispatch: (data) => dispatch(getVendorEmployeeList(data)),
        getStoreListDispatch: () => dispatch(getStoreList()),
        getAccessList: (data) => dispatch(getAccessList(data)),
        action: bindActionCreators({ updateVendorEmployee, openDialog, closeDialog, getVendorEmployeeList, changeEmployeeStatus }, dispatch)
    }
}

class AdminStoresEmployee extends Component {

    constructor() {
        super();
        this.toggleModal = this.toggleModal.bind(this);
        this.openVendorEmployeeModal = this.openVendorEmployeeModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUpdateSubmitVendorEmployee = this.handleUpdateSubmitVendorEmployee.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.handleCancelModal = this.handleCancelModal.bind(this);
        this.getStoreList = this.getStoreList.bind(this);
        this.getAccessList = this.getAccessList.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
        this.changeEmployeeStatus = this.changeEmployeeStatus.bind(this);

        this.state = {
            vendorEmployee: {},
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
            accessLevel: {},
            accessLevelDetail: {},

            isModalOpen: {
                updateVendorEmployee: false
            },
            selectedVendorEmployee: {},
            vendorEmployeeList: {},
            storeList:{},
            storeActiveList:{},
            storeActive: 0,
            activeTab: 0,
            storeIdTab: {}
        };

        this.optionsPagination = {
            prePage:'Prev',
            nextPage:'Next',
            firstPage: '.', // First page button text
            lastPage: '.', // Last page button text
            sortIndicator: true,
            noDataText: 'Nama Staff tidak di temukan',
            searchField: (props) => (<MySearchField { ...props } name="Cari berdasarkan nama staff atau email"/>),
            hideSizePerPage: true,
            searchPosition: 'left',
            // onRowDoubleClick: function(row) {
            //     props.toggle();
            // }
        };
    }

    componentDidMount = () => {
        // this.getVendorEmployeeList();
        this.getStoreList();
        this.getAccessList();
    }


    componentDidUpdate = (prevProps) => {
        const { vendorState, storeMenuList, getVendorEmployeeListDispatch, access } = this.props;
        const { storeActive, vendorEmployeeList } = this.state;
        
         //#Get list Staf Store based on ID STORE
         if(prevProps.vendorState.store !== vendorState.store){
            if(vendorState.store.isLoaded){
                this.setState({
                    ...this.state,
                    // storeActiveList: vendorState.store.data.data.result.store
                    storeActiveList: vendorState.store
                }, () => {
                    getVendorEmployeeListDispatch(vendorState.store.data.data.result.store[storeActive]);
                });
            }
        }

        //#Get All list employee
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

        if(prevProps.vendorState.statusEmployee !== vendorState.statusEmployee) {
            if(vendorState.statusEmployee.isStatusChanging) {
                vendorEmployeeList.data.data.result.staff.map((item) => {
                    item.statusChanging = true;
                    this.forceUpdate();
                })
            }

            if(vendorState.statusEmployee.isStatusChanged) {
                vendorEmployeeList.data.data.result.staff.map((item) => {
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

    getStoreList = () => {
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
    }

    getAccessList = () => {
        const { getAccessList } = this.props;

        let requiredData = {
            active : true
        }

        getAccessList(requiredData);
    }

  
  //#
  toggleTab = (tabIndex, type) => {

        const { getVendorEmployeeList, action } = this.props;
        let data = { id : type.id }

        action.getVendorEmployeeList(data);

        this.setState({
            activeTab: tabIndex,
            storeIdTab: type
        }, () => {                       
            this.populateTableData();
            console.log(this.state.storeIdTab);
        })
    }

    populateTableData = () => {

        const { vendorEmployeeList } = this.state;
        const columns = [
            // {
            //     title: 'ID',
            //     accessor: 'id'
            // },
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
                // accessor: 'action',
                // // render: (data) => (
                // render: (row) => (
                //     <td>
                //         <Button className="margin-right-small" type="button" onClick={() => this.openVendorEmployeeModal(row)}>Ubah</Button>
                //         <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changeEmployeeStatus(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
                //     </td>
                // )
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
    };

    toggleDialog = (data) => {
        const { dialog, action } = this.props;

        if(!dialog.isOpened) {
            action.openDialog(data);
        } else {
            action.closeDialog();
        }
    }

    renderDialog = () => {
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

    openVendorEmployeeModal = (row) => {
        this.setState({
            ...this.state,
            selectedVendorEmployee: row

        }, () => {
            this.toggleModal('updateVendorEmployee')
        })
    };

    handleUpdateSubmitVendorEmployee = (e) => {
        e.preventDefault();
        const { selectedVendorEmployee} = this.state;
        const { updateVendorEmployeeState, vendorState, updateVendorEmployee, action} = this.props;

        if(selectedVendorEmployee.password === selectedVendorEmployee.passwordConfirm){

            let requireDataUpdate = {
                id : selectedVendorEmployee.id,
                name: selectedVendorEmployee.name,
                username: selectedVendorEmployee.username,
                email: selectedVendorEmployee.email,
                level: selectedVendorEmployee.level,
                password: selectedVendorEmployee.password
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

    changeEmployeeStatus = (row) => {
        const { action } = this.props;

        let requiredData = {
              id: row.id
        }

        action.changeEmployeeStatus(requiredData);
    }

    render() {
        const { storeActiveList, activeTab } = this.state;
        const { vendorState } = this.props;

         //#
         const renderTabContent = () => {
             
            if(vendorState.store.isLoaded){
                if(vendorState.store.data.data.result.store.length){
                    return vendorState.store.data.data.result.store.map((type, i) => {
                        return (
                            <TabContent activeTab={activeTab} tabIndex={i}>            
                                <PropsRoute
                                    component={AdminStoresEmployeeView}
                                    type={type}
                                    {...this.props}
                                    {...this.state}
                                    toggleModal={this.toggleModal}
                                    handleInputChange={this.handleInputChange}
                                    handleUpdateSubmitVendorEmployee={this.handleUpdateSubmitVendorEmployee}
                                    handleCancelModal= {this.handleCancelModal}
                                    toggleTab={this.toggleTab}
                                    optionsPagination={this.optionsPagination}
                                    openVendorEmployeeModal={this.openVendorEmployeeModal}
                                    changeEmployeeStatus= {this.changeEmployeeStatus}
                                />
                            </TabContent>
                        )
                    })
                }
            }
        }

        return (
            <div>
                <Nav tabs className="flex justify-content--space-between">
                { vendorState.store.isLoaded ? vendorState.store.data.data.result.store.map((store, i) => (
                    
                    <NavItem>
                        <NavTabLink active={activeTab === i} onClick={() => this.toggleTab(i, store)}>
                            {/* {console.log(store.name)} */}
                            <h5>{store.name}</h5>
                        </NavTabLink>
                    </NavItem>
                )) : null }
                </Nav>

                {/* RENDER CONTENT BASED ON ID STORE */}
                {renderTabContent()}
                {this.renderDialog()}
            </div>
        )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresEmployee);