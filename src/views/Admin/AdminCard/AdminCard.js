import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllCardType, updateCardType, changeCardTypeStatus } from '../../../actions/card.action';
import { getBonusTaxiOnline, getSaldoBonus } from '../../../actions/store.action';//THIS FUNCTION IS NOT OKE
import { Button } from '../../../components/Button';
import AdminCardView from './AdminCardView';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { ModalDialog } from '../../../components/Modal';
import MySearchField from '../../../components/Input/MySearchField';

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
                  },
                  bonus: {},
                  selectedCard:{}            
            };

            // this.getCardTypeList = this.getCardTypeList.bind(this);
            this.populateTableData = this.populateTableData.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.openCardDetail = this.openCardDetail.bind(this);
            this.changeCardStatus = this.changeCardStatus.bind(this);
            this.updateCard = this.updateCard.bind(this);
            this.renderDialog = this.renderDialog.bind(this);

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

            const { action, getSaldoBonusDispatch, getAllCardTypeDispatch} = this.props;
            // action.getBonusTaxiOnline();

            let requireData = {
                  limit: 3
            };
            getAllCardTypeDispatch(requireData);

            // //#GET SALDO BONUS
            // getSaldoBonusDispatch();
      }

      componentDidUpdate = (prevProps) => {
            const {
                  card, storeState
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
                        cardList.data.data.result.map((type) => {
                              type.statusChanging = true;
                              this.forceUpdate();
                        })
                  }

                  if(card.type.isStatusChanged) {
                        cardList.data.data.result.map((type) => {
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
            };

            // THIS FUNCTION IS NOT USE IN PRODUCTION
            if(prevProps.storeState.bonus !== storeState.bonus){
                  if(storeState.bonus.isLoaded){
                      this.setState({
                          ...this.state,
                          bonus: storeState.bonus.data.result.tier
                      },() => {
                            console.log(this.state.bonus)
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
      };

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
      };

      populateTableData = () => {
            const { cardList } = this.state;

            const { card } = this.props;

            const columns = [{
                  title: 'Nama',
                  accessor: 'name'
            }, 
            // {
            //       title: 'Minimum Saldo ',
            //       accessor: 'min',
            //       align: 'center',
            //       rowAlign: 'center',
            //       isCurrency: true
            // }, 
            {
                  title: 'Top Up',
                  accessor: 'min',
                  align: 'center',
                  rowAlign: 'center',
                  isCurrency: true
            },
            // {
            //       title: 'Nominal Tipe-3',
            //       accessor: 'min',
            //       align: 'center',
            //       rowAlign: 'center',
            //       isCurrency: true
            // },
            {
                  title: 'Bonus',
                  accessor: 'bonus',
                  align: 'center',
                  rowAlign: 'center',
                  isCurrency: true
            }, 
            {
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
            }];

            const rows = [];

            // if(cardList.isLoaded) {
            if(card.types.isLoaded){
                  card.types.data.result.card.forEach((data) => {

                        //#
                        // let dataPilihanNominalSaldo = data.min.length ? data.min.filter((data, index, self) => {
                        //       return index == self.indexOf(data);
                        // }): null; 

                        let row = {
                              id: data.id,
                              name: data.name,
                              min: data.min,
                              // mintopup: data.mintopup,
                              bonus: data.bonus,
                              refund: data.refund,
                              charge: data.charge,
                              data: data
                        };

                        rows.push(row);
                  });
            };
    
            this.setState({
                  ...this.state,
                  table: {
                        ...this.state.table,
                        columns: columns,
                        rows: rows
                  }
            });
      };

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
    
            action.changeCardTypeStatus(requiredData);
      }

      updateCard = (e) => {
            
            e.preventDefault();
            const { action } = this.props;
      
            let { selectedCard } = this.state;
           

            if(selectedCard.name === "Member"){
                  let items = [];
                  items.push(selectedCard.opsi1);
                  items.push(selectedCard.opsi2);
                  items.push(selectedCard.opsi3);
      
                  
                  let param = {
                        id: selectedCard.id,
                        name: selectedCard.name,
                        minimum: parseInt(selectedCard.min.replace(/,/g, '')),
                        bonus: selectedCard.bonus ? parseInt(selectedCard.bonus.replace(/,/g, '')) : null,
                        refund: selectedCard.refund,
                        charge: selectedCard.charge,
                        item: items,
                  };

                  console.log(param);
            };
           

           

            // action.updateCardType(param).then(() => {

            //       const { card } = this.props;

            //       if (card.type.isUpdated) {
            //             let dialogData = {
            //                 type: 'success',
            //                 title: 'Berhasil',
            //                 message: 'Card telah berhasil diubah. Klik tombol berikut untuk kembali.',
            //                 onClose: () => window.location.reload(),
            //                 closeText: 'Kembali'
            //             };
                
            //             this.toggleDialog(dialogData);
            //       };
      
            //       if (card.type.isError) {
            //             let dialogData = {
            //                 type: 'danger',
            //                 title: 'Gagal',
            //                 message: 'Card gagal diubah. Klik tombol berikut untuk kembali.',
            //                 onClose: () => this.toggleDialog(),
            //                 closeText: 'Kembali'
            //             }
                
            //             this.toggleDialog(dialogData);
            //       }
            //       // this.toggleModal('updateCard');
            //       // window.location.reload();
            // })
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

      // getCardTypeList = () => {
      //       const {
      //             getAllCardType
      //       } = this.props;

      //       getAllCardType();
      // }
      
      render() {
            return (
                  <div>
                        <AdminCardView
                              {...this.state}
                              {...this.props}
                              handleInputChange={this.handleInputChange}
                              updateCard={this.updateCard}
                              toggleModal={this.toggleModal}
                              optionsPagination={this.optionsPagination}
                              openCardDetail={this.openCardDetail}
                              changeCardStatus={this.changeCardStatus}
                        />
                        {this.renderDialog()}
                  </div>
            );
      }
}

const mapStateToProps = (state) => {
      return {
            card: state.card,
            dialog: state.dialog,
            storeState: state.store,
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            getAllCardTypeDispatch : (data) => dispatch(getAllCardType(data)),
            getSaldoBonusDispatch : () => dispatch(getSaldoBonus()),
            getAllCardType: () => dispatch(getAllCardType()),
            action: bindActionCreators({ updateCardType, changeCardTypeStatus, openDialog, closeDialog, getBonusTaxiOnline }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCard);