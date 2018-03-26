import React, { Component } from 'react';
import classNames from 'classnames';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../Modal';
import DialogIcon from './DialogIcon';
import { Button } from '../Button';

class Dialog extends Component {
      render() {
            const {
                  className,
                  children,
                  title,
                  message,
                  onConfirm,
                  confirmText,
                  onClose,
                  closeText,
                  type
            } = this.props;

            const classes = classNames(
                  className
            )

            return (
                  <Modal {...this.props}>
                        <ModalBody className="flex flex-column align-items--center justify-content--center align-center">
                              <DialogIcon type={type} />
                              <h5 className="fw-semibold margin-top-large">{title}</h5>
                              <p className="align-center margin-top-small">{message}</p>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--center">
                              <Button theme={type} onClick={onClose}>
                                    {closeText}
                              </Button>
                        </ModalFooter>
                  </Modal>
            )
      }
}

export default Dialog;