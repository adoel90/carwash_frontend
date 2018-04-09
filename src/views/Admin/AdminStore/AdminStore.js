import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStoreList, getCategoryList, updateStore, changeStatusStore } from '../../../actions/store.action.js';
import { Button } from '../../../components/Button';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { ModalDialog } from '../../../components/Modal';
import { AdminStoreView } from '../AdminStore';

class AdminStore extends Component {
      constructor() {
            super();

            this.getStoreList = this.getStoreList.bind(this);
            this.getCategoryList = this.getCategoryList.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.renderDialog = this.renderDialog.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.openStoreDetail = this.openStoreDetail.bind(this);
            this.changeStatusStore = this.changeStatusStore.bind(this);
            this.updateStore = this.updateStore.bind(this);
            this.populateTableData = this.populateTableData.bind(this);
            this.state = {
                  store: {},
                  storeList: {},
                  storeCategoryList: {},
                  search: {
                        searchText: '',
                        searchBy: 'name'
                  },
                  table: {
                        columns: [],
                        rows: [],
                        limit: 10,
                        searchParams: [
                              { accessor: 'name', name: 'Nama Store' },
                              { accessor: 'user', name: 'Owner' },
                        ]
                  },
                  isModalOpen: {
                      updateStore: false
                  }
            }
      }

      componentDidMount = () => {
            this.getStoreList();
            this.getCategoryList();
      }

      componentDidUpdate = (prevProps) => {
            const {
                  store
            } = this.props;
      
            const {
                  storeList
            } = this.state;

            if(prevProps.store.list !== store.list) {
                  this.setState({
                        ...this.state,
                        storeList: store.list
                  }, () => {
                        this.populateTableData();
                  });
            }
      
            if(prevProps.store.status !== store.status) {
                  if(store.status.isStatusChanging) {
                        storeList.data.data.result.store.map((item) => {
                              if(item.id === store.status.id) {
                                    item.statusChanging = true;
                                    this.forceUpdate();
                              }
                        })
                  }
      
                  if(store.status.isStatusChanged) {
                        storeList.data.data.result.store.forEach((item) => {
                              if(item.id === store.status.id) {
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
    
            console.log(this.props)
            
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
            const value = target.value;
    
            this.setState({
                  ...this.state,
                  [object]: {
                        ...this.state[object],
                        [name]: value
                  }
            });
      }

      openStoreDetail = (row) => {
            this.setState({
                  ...this.state,
                  selectedStore: row.data
            }, () => {
                  this.toggleModal('updateStore');
            })
      }

      changeStatusStore = (row) => {
            const {
                  action
            } = this.props;
    
            let requiredData = {
                  id: row.data.id
            }
    
            action.changeStatusStore(requiredData);
      }

      updateStore = (e) => {
            const {
                action
            } = this.props;
    
            let {
                selectedStore
            } = this.state;
    
            e.preventDefault();

            let requiredData = {
                  id : selectedStore.id,
                  name : selectedStore.name,
                  category : selectedStore.type.id ? parseInt(selectedStore.type.id) : parseInt(selectedStore.type)
            }
    
            action.updateStore(requiredData).then(() => {
                  const {
                        store
                  } = this.props;

                  if (store.updateStore.isUpdated) {
                        let dialogData = {
                              type: 'success',
                              title: 'Berhasil',
                              message: 'Store telah berhasil diubah. Klik tombol berikut untuk kembali.',
                              onClose: () => window.location.reload(),
                              closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
      
                  if (store.updateStore.isError) {
                        let dialogData = {
                              type: 'danger',
                              title: 'Gagal',
                              message: 'Store gagal diubah. Klik tombol berikut untuk kembali.',
                              onClose: () => this.toggleDialog(),
                              closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
            //     this.toggleModal('updateStore');
                
            //     window.location.reload();
            })
      }
    
      populateTableData = () => {
            const { storeList } = this.state;
            
            const columns = [{
                  title: 'Nama Store',
                  accessor: 'name'
            }, {
                  title: 'Owner',
                  accessor: 'user'
            }, {
                  title: 'Kategori',
                  accessor: 'type',
                  align: 'center'
            }, {
                  title: 'Status',
                  accessor: 'action',
                  width: '30%',
                  align: 'center',
                  render: (row) => (
                        <td className="flex justify-content--center">
                              <Button className="margin-right-small" type="button" onClick={() => this.openStoreDetail(row)}>Ubah</Button>
                              <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changeStatusStore(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
                        </td>
                  )
            }]
    
            const rows = [] 
            
            if(storeList.isLoaded) {
                  storeList.data.data.result.store.forEach((store, i) => {
                        if(store.owner) {
                              let row = {
                                    id: store.id,
                                    name: store.name,
                                    user: store.user.name,
                                    type: store.type.name,
                                    data: store
                              }
            
                              rows.push(row);
                        }
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

      getStoreList = () => {
            const {
                  getStoreList
            } = this.props;

            getStoreList();
      }

      getCategoryList = () => {
            const {
                  getCategoryList
            } = this.props;

            getCategoryList();
      }
      
      render() {
            return (
                  <div>
                        <AdminStoreView
                              {...this.state}
                              {...this.props}
                              handleInputChange={this.handleInputChange}
                              updateStore={this.updateStore}
                              toggleModal={this.toggleModal}
                        />
                        {this.renderDialog()}
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            store: state.store,
            dialog: state.dialog
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            getStoreList: () => dispatch(getStoreList()),
            getCategoryList: () => dispatch(getCategoryList()),
            action: bindActionCreators({ updateStore, changeStatusStore, openDialog, closeDialog }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStore);