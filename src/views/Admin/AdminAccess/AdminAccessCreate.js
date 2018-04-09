import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllModule } from '../../../actions/module.action';
import { createNewAccess } from '../../../actions/access.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { ModalDialog } from '../../../components/Modal';
import AdminAccessCreateView from './AdminAccessCreateView';

class AdminAccessCreate extends Component {
      constructor() {
            super();
            this.state = {
                  newAccess: {
                        name: '',
                        module: []
                  }
            }

            this.getModuleList = this.getModuleList.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleInputChangeModule = this.handleInputChangeModule.bind(this);
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
            this.renderDialog = this.renderDialog.bind(this);
      }

      componentDidMount = () => {
            this.getModuleList();
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
            
            return (
                <ModalDialog
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
            const value = target.type === 'checkbox' ? target.checked : target.value;

            this.setState({
                  ...this.state,
                  [object]: {
                        ...this.state[object],
                        [name]: value
                  }
            });
      }

      handleInputChangeModule = (object, selectedItem, e) => {
            // const target = e.target;
            // const name = target.name;
            // const value = target.type === 'checkbox' ? target.checked : target.value;

            // this.setState({
            //       ...this.state,
            //       [object]: {
            //             ...this.state[object],
            //             [name]: value
            //       }
            // });
            let objectCopy = Object.assign({}, object);

		let found = objectCopy.module.some((item, i) => {
			return selectedItem.id === item.id
		})

		if(!found) {
			objectCopy.module.push(selectedItem);
			this.forceUpdate();
		}
		else {
			objectCopy.module.some((item, i) => {
				if(selectedItem.id === item.id) {
					objectCopy.module.splice(i, 1);
					this.forceUpdate();
				}
			})
		}
      }

      handleFormSubmit = (e) => {
            const {
                  newAccess
            } = this.state;
            
            const {
                  action
            } = this.props;
            
            e.preventDefault();
            
            if(newAccess.module.length > 0) {
                  let dataModule = [];

                  for(let i=0; i<newAccess.module.length; i++) {
                        dataModule.push(newAccess.module[i].id);
                  }

                  const requiredData = {
                        name: newAccess.name,
                        module: dataModule
                  }
      
                  action.createNewAccess(requiredData).then(() => {
                        const {
                              access
                        } = this.props;
                        
                        if(access.new.isCreated) {
                              let dialogData = {
                                  type: 'success',
                                  title: 'Berhasil',
                                  message: 'Access telah berhasil ditambahkan. Klik tombol berikut untuk kembali.',
                                  onClose: () => window.location.reload(),
                                  closeText: 'Kembali'
                              }
                      
                              this.toggleDialog(dialogData);
                        } if (access.new.isError) {
                              let dialogData = {
                                  type: 'danger',
                                  title: 'Gagal',
                                  message: 'Access gagal ditambahkan. Klik tombol berikut untuk kembali.',
                                  onClose: () => this.toggleDialog(),
                                  closeText: 'Kembali'
                              }
                      
                              this.toggleDialog(dialogData);
                        }
                  });
            }

      }
      
      getModuleList = () => {
            const {
                  getAllModule
            } = this.props;

            getAllModule();
      }
      
      render() {
            return (
                  <div>
                        <AdminAccessCreateView 
                              {...this.state} 
                              {...this.props} 
                              handleInputChange={this.handleInputChange}
                              handleInputChangeModule={this.handleInputChangeModule}
                              handleFormSubmit={this.handleFormSubmit}
                        />
                        {this.renderDialog()}
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            access: state.access,
            module: state.module,
            dialog: state.dialog
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            getAllModule: () => dispatch(getAllModule()),
            action: bindActionCreators({ createNewAccess, openDialog, closeDialog }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccessCreate);