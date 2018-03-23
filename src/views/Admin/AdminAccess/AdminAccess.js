import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccessList, getAccessDetail, updateAccess, changeStatusAccess } from '../../../actions/access.action';
import { getAllModule } from '../../../actions/module.action';
import { Button } from '../../../components/Button';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { Dialog } from '../../../components/Dialog';
import AdminAccessView from './AdminAccessView';

class AdminAccess extends Component {
      constructor() {
            super();
            this.state = {
                  access: {},
                  accessList: {},
                  module: {},
                  moduleList: {},
                  table: {
                        columns: [],
                        rows: [],
                        limit: 10
                  },
                  isModalOpen: {
                        updateAccess: false
                  }
            }

            this.getAccessList = this.getAccessList.bind(this);
            this.getModuleList = this.getModuleList.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleInputChangeModule = this.handleInputChangeModule.bind(this);
            this.openAccessDetail = this.openAccessDetail.bind(this);
            this.changeStatusAccess = this.changeStatusAccess.bind(this);
            this.updateAccess = this.updateAccess.bind(this);
            this.populateTableData = this.populateTableData.bind(this);
            this.renderDialog = this.renderDialog.bind(this);
      }
      
      componentDidMount = () => {
            this.getAccessList();
            this.getModuleList();
      }

      componentDidUpdate = (prevProps) => {
            const {
                  access,
                  module
            } = this.props;

            const {
                  accessList,
                  moduleList
            } = this.state;

            if(prevProps.access.list !== access.list) {
                  this.setState({
                        ...this.state,
                        accessList: access.list
                  }, () => {
                        this.populateTableData();
                  })
            }

            if(prevProps.access.item !== access.item) {
                  if(access.item.isStatusChanging) {
                        accessList.data.result.map((item) => {
                              item.statusChanging = true;
                              this.forceUpdate();
                        })
                  }

                  if(access.item.isStatusChanged) {
                        accessList.data.result.map((item) => {
                              if (item.id === access.item.id) {
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

            if(prevProps.module.list !== module.list) {
                  this.setState({
                        ...this.state,
                        moduleList: module.list
                  }, () => {
                        this.forceUpdate();
                  })
            }
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

      populateTableData = () => {
            const { accessList } = this.state;
            
            const columns = [{
                  title: 'Nama',
                  accessor: 'name'
            }, {
                  title: 'Aksi',
                  accessor: 'action',
                  width: '30%',
                  align: 'center',
                  render: (row) => (
                        <td className="flex justify-content--center">
                              <Button className="margin-right-small" type="button" onClick={() => this.openAccessDetail(row)}>Ubah</Button>
                              <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changeStatusAccess(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
                        </td>
                  )
            }]
    
            const rows = [];

            if(accessList.isLoaded) {
                  accessList.data.result.forEach((access, i) => {
                        let row = {
                              id: access.id,
                              name: access.name,
                              data: access
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
            }, () => {
                  console.log(this.state)
            })
      }

      openAccessDetail = (row) => {
            const {
                  action
            } = this.props;

            action.getAccessDetail(row).then(() => {
                  const {
                        access
                  } = this.props;

                  if(access.detail.isLoaded) {
                        this.setState({
                              ...this.state,
                              selectedAccess: access.detail.data.data.result
                        }, () => {
                              this.toggleModal('updateAccess');
                        })
                  }
            })
      }

      changeStatusAccess = (row) => {
            const {
                  action
            } = this.props;
    
            let requiredData = {
                  id: row.data.id
            }
    
            action.changeStatusAccess(requiredData);
      }

      updateAccess = (e) => {
            const {
                  action
            } = this.props;
      
            let {
                  selectedAccess
            } = this.state;
      
            e.preventDefault();

            let dataModule = [];

            if(selectedAccess.module.length > 0) {
                  for(let i=0; i<selectedAccess.module.length; i++) {
                        dataModule.push(selectedAccess.module[i].id)
                  }

                  let requiredData = {
                        id : selectedAccess.id,
                        name : selectedAccess.name,
                        module : dataModule
                  }
      
                  action.updateAccess(requiredData).then(() => {
                        const {
                              access
                        } = this.props;
      
                        if (access.item.isUpdated) {
                              let dialogData = {
                                  type: 'success',
                                  title: 'Berhasil',
                                  message: 'Access telah berhasil diubah. Klik tombol berikut untuk kembali.',
                                  onClose: () => window.location.reload(),
                                  closeText: 'Kembali'
                              }
                      
                              this.toggleDialog(dialogData);
                        }
            
                        if (access.item.isError) {
                              let dialogData = {
                                  type: 'danger',
                                  title: 'Gagal',
                                  message: 'Access gagal diubah. Klik tombol berikut untuk kembali.',
                                  onClose: () => this.toggleDialog(),
                                  closeText: 'Kembali'
                              }
                      
                              this.toggleDialog(dialogData);
                        }
                        // this.toggleModal('updateAccess');
                        
                        // window.location.reload();
                  })
            }
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

      handleInputChangeModule = (object, selectedItem, e) => {
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

      getAccessList = () => {
            const {
                  getAccessList
            } = this.props;

            let requiredData = {
                  active : false
            }

            getAccessList(requiredData);
      }

      getModuleList = () => {
            const {
                  getAllModule
            } = this.props;

            getAllModule();
      }

      render() {
            console.log(this.props)
            return (
                  <div>
                        <AdminAccessView 
                              {...this.state}
                              {...this.props}
                              handleInputChange={this.handleInputChange}
                              handleInputChangeModule={this.handleInputChangeModule}
                              updateAccess={this.updateAccess}
                              toggleModal={this.toggleModal}
                        />
                        {this.renderDialog()}
                  </div>
            )
      }
}

const mapStateToProps = (state) => {
      return {
          access: state.access,
          module: state.module,
          dialog: state.dialog
      };
}
  
const mapDispatchToProps = (dispatch) => {
      return {
          getAccessList: (data) => dispatch(getAccessList(data)),
          getAllModule: () => dispatch(getAllModule()),
          action: bindActionCreators({ getAccessDetail, updateAccess, changeStatusAccess, openDialog, closeDialog }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccess);