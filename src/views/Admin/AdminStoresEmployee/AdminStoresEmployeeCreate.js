import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dialog } from '../../../components/Dialog';
import { AdminStoresEmployeeCreateView } from '../AdminStoresEmployee';



import { getStoreList } from '../../../actions/vendor.action';
import { createStaffStore } from '../../../actions/store.action';
import { getAccessList } from '../../../actions/access.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';

function mapStateToProps(state) {
    return {
        store : state.store,
        dialog: state.dialog,
        access: state.access
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        getAccessListDispatch: (data) => dispatch(getAccessList(data)),
        action: bindActionCreators({createStaffStore, openDialog, closeDialog }, dispatch)
    }
}

class AdminStoresEmployeeCreate extends Component {
    
    constructor(){
        super()
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        // this.renderDialog = this.renderDialog.bind(this);
        // this.getAccessList = this.getAccessList.bind(this);

        this.state = {

            newStaff: {
                name: '',
                username:'',
                password:'',
                email: '',
                level:null,
                store: null
            },

            accessLevel: {},

            storeList: {},
            storeActive: 0,
            levelId: null,
            // accessLevel : [
			// 	{ id : 4 , name : Owner},
			// 	{ id : 5 , name : Kasir Store},
			// 	{ id : 6 , name : Staff Store}
			// ]
        }
    }

    componentDidMount(){
        const { getStoreListDispatch, getAccessListDispatch } = this.props;
        getStoreListDispatch();    

        let requiredData = {
            active : true
        }
        getAccessListDispatch(requiredData);

        // this.state.levelId = JSON.parse(localStorage.getItem('userData')).level.id;
    
    }

    //#
    componentDidUpdate(prevProps){
        const { store, access } = this.props;
        //Get Store List
        if(prevProps.store.list !== store.list) {
            if (store.list.isLoaded) { 
                this.setState({
                    ...this.state,
                    storeList: store.list.data.data.result.store

                }, () => {
                    // console.log(this.state);
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
                    console.log(this.state);
                })
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

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { newStaff, storeList, storeActive, levelId , accessLevel} = this.state;
        const { action } = this.props;
        
        
        const requiredData = {
            store: newStaff.store ? parseInt( newStaff.store) : "Failed parse INTEGER!!!",
            name: newStaff.name,
            username: newStaff.username,
            password: newStaff.password,
            email: newStaff.email,
            level: newStaff.level ? parseInt(newStaff.level) : "Failed parse INTEGER!!!"
        }
        
        console.log(requiredData);

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
            <div>
                <AdminStoresEmployeeCreateView 
                    {...this.state} 
                    {...this.props} 
                    handleInputChange = {this.handleInputChange}
                    handleFormSubmit = { this.handleFormSubmit }
                   
                    />

                    {this.renderDialog()}
                
            </div>
        )
        
           
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStoresEmployeeCreate); 