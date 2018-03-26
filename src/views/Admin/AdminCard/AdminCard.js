import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllCardType, updateCardType, changeCardTypeStatus } from '../../../actions/card.action';
import { Button } from '../../../components/Button';
import AdminCardView from './AdminCardView';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { Dialog } from '../../../components/Dialog';

class AdminCard extends Component {
      constructor() {
            super();
            this.state = {
                  card: {},
                  cardList: {},
                  search: {
                        searchText: '',
                        searchBy: 'name'
                  },
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
            this.getCardTypeList = this.getCardTypeList.bind(this);
            this.populateTableData = this.populateTableData.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.openCardDetail = this.openCardDetail.bind(this);
            this.changeCardStatus = this.changeCardStatus.bind(this);
            this.updateCard = this.updateCard.bind(this);
            this.renderDialog = this.renderDialog.bind(this);
      }

      componentDidMount = () => {
            this.getCardTypeList();
      }

      componentDidUpdate = (prevProps) => {
            const {
                  card
            } = this.props;

            const {
                  cardList
            } = this.state;

            if(prevProps.card.types !== card.types) {
                  this.setState({
                        ...this.state,
                        cardList: card.types
                  }, () => {
                        this.populateTableData();
                  })
            }

            if(prevProps.card.type !== card.type) {
                  if(card.type.isStatusChanging) {
                        cardList.data.result.map((type) => {
                              type.statusChanging = true;
                              this.forceUpdate();
                        })
                  }

                  if(card.type.isStatusChanged) {
                        cardList.data.result.map((type) => {
                              if (type.id === card.type.id) {
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
            const { cardList } = this.state;

            const columns = [{
                  title: 'Nama',
                  accessor: 'name'
            }, {
                  title: 'Minimum',
                  accessor: 'min',
                  align: 'center',
                  rowAlign: 'right'
            }, {
                  title: 'Bonus',
                  accessor: 'bonus',
                  align: 'center',
                  rowAlign: 'right'
            }, {
                  title: 'Aksi',
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

            if(cardList.isLoaded) {
                  cardList.data.result.forEach((card, i) => {
                        let row = {
                              id: card.id,
                              name: card.name,
                              min: card.min,
                              bonus: card.bonus,
                              refund: card.refund,
                              data: card
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

      openCardDetail = (row) => {
            this.setState({
                  ...this.state,
                  selectedCard: row.data
            }, () => {
                  this.toggleModal('updateCard');
            })
      }

      changeCardStatus = (row) => {
            const {
                  action
            } = this.props;
    
            let requiredData = {
                  id: row.data.id
            }
    
            action.changeCardTypeStatus(requiredData);
      }

      updateCard = (e) => {
            const {
                  action
            } = this.props;
      
            let {
                  selectedCard
            } = this.state;
      
            e.preventDefault();

            action.updateCardType(selectedCard).then(() => {
                  const {
                        card
                  } = this.props;

                  if (card.type.isUpdated) {
                        let dialogData = {
                            type: 'success',
                            title: 'Berhasil',
                            message: 'Card telah berhasil diubah. Klik tombol berikut untuk kembali.',
                            onClose: () => window.location.reload(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
      
                  if (card.type.isError) {
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

      getCardTypeList = () => {
            const {
                  getAllCardType
            } = this.props;

            getAllCardType();
      }
      
      render() {
            return (
                  <div>
                        <AdminCardView
                              {...this.state}
                              {...this.props}
                              handleInputChange={this.handleInputChange}
                              updateCard={this.updateCard}
                              toggleModal={this.toggleModal}
                        />
                        {this.renderDialog()}
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            card: state.card,
            dialog: state.dialog
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            getAllCardType: () => dispatch(getAllCardType()),
            action: bindActionCreators({ updateCardType, changeCardTypeStatus, openDialog, closeDialog }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCard);