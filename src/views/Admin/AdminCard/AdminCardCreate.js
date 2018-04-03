import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AdminCardCreateView } from '../AdminCard';
import { createNewCardType } from '../../../actions/card.action';
import { getAccessList } from '../../../actions/access.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { Dialog } from '../../../components/Dialog';

class AdminCardCreate extends Component {
      constructor() {
            super();
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
            this.renderDialog = this.renderDialog.bind(this);
            this.state = {
                  newCard: {
                        name: '',
                        minimum: '',
                        bonus: '',
                        refund: 0,
                        charge: 0
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

      handleFormSubmit = (e) => {
            const {
                  newCard
            } = this.state;
            
            const {
                  createNewCardType,
                  action
            } = this.props;
            
            e.preventDefault();

            const requiredData = {
                  name: newCard.name,
                  minimum: parseInt(newCard.minimum),
                  bonus: parseInt(newCard.bonus),
                  refund: Boolean(newCard.refund),
                  charge: Boolean(newCard.charge)
            }

            action.createNewCardType(requiredData).then(() => {
                  const {
                        card
                  } = this.props;

                  if(card.type.isCreated) {
                        let dialogData = {
                            type: 'success',
                            title: 'Berhasil',
                            message: 'Card telah berhasil ditambahkan. Klik tombol berikut untuk kembali.',
                            onClose: () => window.location.reload(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
                  if (card.type.isError) {
                        let dialogData = {
                            type: 'danger',
                            title: 'Gagal',
                            message: 'Card gagal ditambahkan. Klik tombol berikut untuk kembali.',
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
                        <AdminCardCreateView 
                              {...this.state} 
                              {...this.props} 
                              handleInputChange={this.handleInputChange}
                              handleFormSubmit={this.handleFormSubmit}
                        />
                        {this.renderDialog()}
                  </div>
            )
      }
}

const mapStateToProps = (state) => {
      return {
            card: state.card,
            dialog: state.dialog
      };
}

const mapDispatchToProps = (dispatch) => {
      return {
            action: bindActionCreators({ createNewCardType, openDialog, closeDialog }, dispatch)
      }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminCardCreate);