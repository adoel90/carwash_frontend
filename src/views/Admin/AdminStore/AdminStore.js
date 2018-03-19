import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStoreList, getCategoryList, updateStore, changeStatusStore } from '../../../actions/store.action.js';
import { Button } from '../../../components/Button';

import { AdminStoreView } from '../AdminStore';

class AdminStore extends Component {
      constructor() {
            super();

            this.getStoreList = this.getStoreList.bind(this);
            this.getCategoryList = this.getCategoryList.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.openStoreDetail = this.openStoreDetail.bind(this);
            this.changeStatusStore = this.changeStatusStore.bind(this);
            this.updateStore = this.updateStore.bind(this);
            this.populateTableData = this.populateTableData.bind(this);
            this.state = {
                  store: {},
                  storeList: {},
                  storeCategoryList: {},
                  table: {
                      columns: [],
                      rows: [],
                      limit: 10
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
    
            action.updateStore(selectedStore).then(() => {
                this.toggleModal('updateStore');
                
                window.location.reload();
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
                  title: 'Tipe Store',
                  accessor: 'type',
                  align: 'center'
            }, {
                  title: 'Aksi',
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
                        let row = {
                              id: store.id,
                              name: store.name,
                              user: store.user.name,
                              type: store.type.name,
                              data: store
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
            console.log(this.props)
            return (
                  <AdminStoreView
                        {...this.state}
                        {...this.props}
                        handleInputChange={this.handleInputChange}
                        updateStore={this.updateStore}
                        toggleModal={this.toggleModal}
                  />
            );
      }
}

const mapStateToProps = (state) => {
      return {
            store: state.store
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            getStoreList: () => dispatch(getStoreList()),
            getCategoryList: () => dispatch(getCategoryList()),
            action: bindActionCreators({ updateStore, changeStatusStore }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStore);