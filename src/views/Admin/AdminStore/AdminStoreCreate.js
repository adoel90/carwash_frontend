import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategoryList, createStore } from '../../../actions/store.action';
import { getUserList } from '../../../actions/user.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { Dialog } from '../../../components/Dialog';
import AdminStoreCreateView from './AdminStoreCreateView';

class AdminStoreCreate extends Component {
      constructor() {
            super();
            this.getCategoryList = this.getCategoryList.bind(this);
            this.getUserList = this.getUserList.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
            this.renderDialog = this.renderDialog.bind(this);
            this.state = {
                  newStore: {
                      name: '',
                      category: '',
                      user: ''
                  }
            }
      }

      componentDidMount = () => {
            this.getCategoryList();
            this.getUserList();
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
            const {
                dialog,
                toggleDialog
            } = this.props;
    
            console.log(this.props)
            
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
            const {
                  newStore
            } = this.state;
            
            const {
                  action
            } = this.props;
            
            e.preventDefault();

            const requiredData = {
                  name: newStore.name,
                  category: newStore.category,
                  user: newStore.user
            }

            action.createStore(requiredData).then(() => {
                  const {
                        store
                  } = this.props;

                  if(store.item.isCreated) {
                        let dialogData = {
                            type: 'success',
                            title: 'Berhasil',
                            message: 'Store telah berhasil ditambahkan. Klik tombol berikut untuk kembali.',
                            onClose: () => window.location.reload(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
                  if (store.item.isError) {
                        let dialogData = {
                            type: 'danger',
                            title: 'Gagal',
                            message: 'Store gagal ditambahkan. Klik tombol berikut untuk kembali.',
                            onClose: () => this.toggleDialog(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
            });
      }

      getCategoryList = () => {
            const {
                  action
            } = this.props;

            action.getCategoryList();
      }

      getUserList = () => {
            const {
                  action
            } = this.props;

            let requiredData = {
                  access : 4,
                  active : true
            }

            action.getUserList(requiredData);
      }
      
      render() {
            return (
                  <div>
                        <AdminStoreCreateView 
                              {...this.state} 
                              {...this.props} 
                              handleInputChange={this.handleInputChange}
                              handleFormSubmit={this.handleFormSubmit}
                        />
                        {this.renderDialog()}
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            store: state.store,
            user: state.user,
            dialog: state.dialog
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            action: bindActionCreators({ createStore, getCategoryList, getUserList, openDialog, closeDialog }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreCreate);