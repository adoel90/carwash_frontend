import React, { Component } from 'react';
import classNames from 'classnames';
import { Modal, ModalBody, ModalFooter } from '../Modal';
import { Button } from '../Button';

class ModalDialog extends Component {
      constructor() {
            super();
            this.renderDialogButtons = this.renderDialogButtons.bind(this);
      }

      renderDialogButtons = () => {
            const {
                  onCancel,
                  onConfirm,
                  onClose,
                  confirmText,
                  cancelText,
                  closeText,
            } = this.props;

            let buttonStack = [];

            if(onClose) {
                  buttonStack.push(
                        <Button theme="danger" size="small" className="clr-light margin-right-small" onClick={onClose}>
                              <small className="fw-semibold tt-uppercase ls-base">
                                    {closeText}
                              </small>
                        </Button>
                  )
            }

            if(onConfirm) {
                  buttonStack.push(
                        <Button theme="primary" size="small" className="clr-light margin-right-small" onClick={onClose}>
                              <small className="fw-semibold tt-uppercase ls-base">
                                    {confirmText}
                              </small>
                        </Button>
                  )
            }

            return buttonStack;
      }
      
      render() {
            const {
                  children,
                  type,
                  title,
                  message,
                  className
            } = this.props;

            const classes = classNames(
                  className
            )
            
            return (
                  <Modal
                        // isOpen={isModalOpen.updateMember}
                        // toggle={() => toggleModal('updateMember')}
                  >
                        <ModalBody>
                              <h5 className="fw-semibold">{title}</h5>
					<p>{message}</p>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                              { this.renderDialogButtons() }
                        </ModalFooter>
                  </Modal>
            );
      }
}

export default ModalDialog;