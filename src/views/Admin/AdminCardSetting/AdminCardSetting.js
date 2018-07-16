import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllBalanceCard, createNewBalanceCard, updateBalanceCard, changeBalanceCardStatus, deleteBalanceCard } from '../../../actions/balance.action';
import { Button } from '../../../components/Button';
import AdminCardSettingView from './AdminCardSettingView';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { ModalDialog } from '../../../components/Modal';
import MySearchField from '../../../components/Input/MySearchField';

class AdminCardSetting extends Component {
      constructor() {
            super();
            this.state = {
                  card: {},
                  balanceList: {},
                  table: {
                        columns: [],
                        rows: [],
                        limit: 10,
                        searchParams: [
                              { accessor: 'name', name: 'Nama Kartu' }
                        ]
                  },
                  isModalOpen: {
                        updateCard: false
                  }
            }

            this.getBalanceCardList = this.getBalanceCardList.bind(this);
            this.populateTableData = this.populateTableData.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.openCardDetail = this.openCardDetail.bind(this);
            this.changeCardStatus = this.changeCardStatus.bind(this);
            this.updateCard = this.updateCard.bind(this);
            this.renderDialog = this.renderDialog.bind(this);
            this.deleteBalance = this.deleteBalance.bind(this);

            this.optionsPagination = {
                  prePage:'Prev',
                  nextPage:'Next',
                  firstPage: '.', // First page button text
                  lastPage: '.', // Last page button text
                  sortIndicator: true,
                  noDataText: 'Nama Staff tidak di temukan',
                  searchField: (props) => (<MySearchField { ...props } name="Cari kartu yang terdaftar"/>),
                  hideSizePerPage: true,
                  searchPosition: 'left'
                  // onRowDoubleClick: function(row) {
                  //     props.toggle();
                  // }
              };
      }

      componentDidMount = () => {
            this.getBalanceCardList();
      }

      componentDidUpdate = (prevProps) => {
            const {
                  balance
            } = this.props;

            const {
                  cardList
            } = this.state;
            
            if(prevProps.balance.list !== balance.list) {
                  this.setState({
                        ...this.state,
                        balanceList: balance.list
                  }, () => {
                        this.populateTableData();
                  })
            }

            if(prevProps.balance.balance !== balance.balance) {
                  if(balance.balance.isStatusChanging) {
                        cardList.data.data.result.map((type) => {
                              type.statusChanging = true;
                              this.forceUpdate();
                        })
                  }

                  if(balance.balance.isStatusChanged) {
                        cardList.data.data.result.map((type) => {
                              if (type.id === balance.balance.id) {
                                    type.statusChanging = false;

                                    if(type.status) {
                                          type.status = false;
                                    } 
                                    else {
                                          type.status = true;
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

      populateTableData = () => {
            const { balanceList } = this.state;

            const columns = [{
                  title: 'Nama',
                  accessor: 'name'
            }, {
                  title: 'Minimum',
                  accessor: 'min',
                  align: 'center',
                  rowAlign: 'right',
                  isCurrency: true
            }, {
                  title: 'Bonus',
                  accessor: 'bonus',
                  align: 'center',
                  rowAlign: 'right',
                  isCurrency: true
            }, {
                  title: 'Status',
                  accessor: 'action',
                  width: '30%',
                  align: 'center',
                  render: (row) => (
                        <td className="flex justify-content--center">
                              <Button className="margin-right-small" type="button" onClick={() => this.openCardDetail(row)}>Ubah</Button>
                              <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changeCardStatus(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
                        </td>
                  )
            }]

            const rows = [];

            if(balanceList.isLoaded) {
                  balanceList.data.result.forEach((data, i) => {
                        let row = {
                              id: data.id,
                              card: data.card.name,
                              balance: data.balance,
                              bonus: data.bonus,
                              data: data
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

      openCardDetail = (row) => {
            this.setState({
                  ...this.state,
                  selectedCard: row
            }, () => {
                  this.toggleModal('updateCard');
            })
      }

      changeCardStatus = (row) => {
            const {
                  action
            } = this.props;
    
            let requiredData = {
                  id: row.id
            }
    
            action.changeBalanceCardStatus(requiredData);
      }

      updateCard = (e) => {
            const {
                  action
            } = this.props;
      
            let {
                  selectedCard
            } = this.state;
      
            e.preventDefault();

            let param = {
                  id: selectedCard.id,
                  card: selectedCard.card.id,
                  saldo: parseInt(selectedCard.balance.replace(/,/g, '')),
                  bonus: parseInt(selectedCard.bonus.replace(/,/g, ''))
            }

            action.updateBalanceCard(param).then(() => {
                  const {
                        balance
                  } = this.props;

                  if (balance.balance.isUpdated) {
                        let dialogData = {
                            type: 'success',
                            title: 'Berhasil',
                            message: 'Card telah berhasil diubah. Klik tombol berikut untuk kembali.',
                            onClose: () => window.location.reload(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
      
                  if (balance.balance.isError) {
                        let dialogData = {
                            type: 'danger',
                            title: 'Gagal',
                            message: 'Card gagal diubah. Klik tombol berikut untuk kembali.',
                            onClose: () => this.toggleDialog(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
                  // this.toggleModal('updateCard');
                  
                  // window.location.reload();
            })
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

      getBalanceCardList = () => {
            const {
                  action
            } = this.props;

            action.getAllBalanceCard();
      }

      deleteBalance = () => {
            const {
                  action
            } = this.props;

            const {
                  selectedCard
            } = this.state

            action.deleteBalanceCard(selectedCard.id).then(() => {
                  const {
                        balance
                  } = this.props;

                  if (balance.delete.isDeleted) {
                        let dialogData = {
                            type: 'success',
                            title: 'Berhasil',
                            message: 'Card telah berhasil diubah. Klik tombol berikut untuk kembali.',
                            onClose: () => window.location.reload(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
      
                  if (balance.delete.isError) {
                        let dialogData = {
                            type: 'danger',
                            title: 'Gagal',
                            message: 'Card gagal diubah. Klik tombol berikut untuk kembali.',
                            onClose: () => this.toggleDialog(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
            });
      }
      
      render() {
            return (
                  <div>
                        <AdminCardSettingView
                              {...this.state}
                              {...this.props}
                              handleInputChange={this.handleInputChange}
                              updateCard={this.updateCard}
                              toggleModal={this.toggleModal}
                              optionsPagination={this.optionsPagination}
                              openCardDetail={this.openCardDetail}
                              changeCardStatus={this.changeCardStatus}
                              deleteBalance={this.deleteBalance}
                        />
                        {this.renderDialog()}
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            balance: state.balance,
            dialog: state.dialog
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            action: bindActionCreators({ getAllBalanceCard, updateBalanceCard, changeBalanceCardStatus, deleteBalanceCard, openDialog, closeDialog }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCardSetting);