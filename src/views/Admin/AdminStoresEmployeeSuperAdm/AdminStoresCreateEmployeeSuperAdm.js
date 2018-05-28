import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropsRoute } from '../../../components/Route';
import { Dialog } from '../../../components/Dialog';

import { AdminStoresCreateEmployeeSuperAdmView } from '../AdminStoresEmployeeSuperAdm';
import { getStoreList } from '../../../actions/store.action';
import { createStaffStore } from '../../../actions/store.action';
import { getAccessList } from '../../../actions/access.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';



function mapStateToProps(state) {
    return {
        vendorState: state.vendorState,
        store: state.store,
        dialog: state.dialog,
        access: state.access
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        getAccessListDispatch: (data) => dispatch(getAccessList(data)),
        action: bindActionCreators({createStaffStore, openDialog, closeDialog }, dispatch)
    }
}


class AdminStoresCreateEmployeeSuperAdm extends Component {

    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {

            newStaff: {
                name: '',
                username:'',
                password:'',
                confirmPassword: '',
                email: '',
                level:null,
                store: null
            },
            storeActiveList: {},
            accessLevel: {},
            levelId: null,
        }


    };

    componentDidMount(){
        //#
        const { getStoreListDispatch, getAccessListDispatch } = this.props;
        getStoreListDispatch();

        //#
        let requiredData = {
            active : true
        }
        getAccessListDispatch(requiredData);
    }

    componentDidUpdate(prevProps){
        const { vendorState, access } = this.props;

        if(prevProps.vendorState.store != vendorState.store){
            if(vendorState.store.isLoaded){
                this.setState({  
                    ...this.state,
                    storeActiveList: vendorState.store.isLoaded ? vendorState.store.data.data.result.store : null
                }, () => {
                    // console.log(this.state.storeActiveList);
                });
            }
        }
        
        //#Get All Access List
        if(prevProps.access.list !== access.list){
            if(access.list.isLoaded){ 
                this.setState({
                    ...this.state,
                    accessLevel: access.list.data.result
                });
            }
        }
    }

    toggleDialog = (data) => {
        const {
            dialog,
            action
        } = this.props;

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

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { newStaff, storeList, storeActive, levelId , accessLevel} = this.state;
        const { action } = this.props;

        // console.log(newStaff);

        if(newStaff.password === newStaff.confirmPassword){

            const requiredData = {
                store: newStaff.store ? parseInt( newStaff.store) : "Failed parse INTEGER!!!",
                name: newStaff.name,
                username: newStaff.username,
                password: newStaff.password,
                email: newStaff.email,
                level: newStaff.level ? parseInt(newStaff.level) : "Failed parse INTEGER!!!"
            }
            
            // console.log(requiredData);
    
            action.createStaffStore(requiredData).then(() => {
                if(this.props.store.staffemployee.isCreated){
    
                    console.log("Created!!!");
                    
                    let dialogData = {
                        type: 'success',
                        title: 'Berhasil',
                        message: 'Staff baru berhasil ditambahkan. Klik tombol berikut untuk kembali.',
                        onClose: () => window.location.reload(),
                        closeText: 'Kembali'
                    }
            
                    this.toggleDialog(dialogData);
    
                }
                
                if(this.props.store.staffemployee.isError){
    
                    console.log("Errur!!!");
                    
                    let dialogData = {
                        type: 'danger',
                        title: 'Gagal',
                        message: 'Gagal menambahkan Staff baru. Klik tombol berikut untuk kembali.',
                        onClose: () => this.toggleDialog(),
                        closeText: 'Kembali'
                    }
            
                    this.toggleDialog(dialogData);
                    
                }
            });
        } else {
            let dialogData = {
                type: 'danger',
                title: 'Gagal',
                message: 'Kata sandi tidak cocok. Silahkan coba lagi.',
                onClose: () => this.toggleDialog(),
                closeText: 'Kembali'
            }
    
            this.toggleDialog(dialogData);
        }
    }


    render() {
        return (
            <div>
                <AdminStoresCreateEmployeeSuperAdmView 
                    handleInputChange = {this.handleInputChange}
                    handleFormSubmit = {this.handleFormSubmit}
                    {...this.state} 
                    {...this.props} />

                {this.renderDialog()}
            </div>
        )
        
    }
}

// export default AdminStoresCreateEmployeeSuperAdm;
export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresCreateEmployeeSuperAdm);
