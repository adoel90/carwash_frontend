import React, { Component } from 'react';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Form, FormGroup } from '../../../components/Form';
import { Input, Label, InputAddon, InputGroup } from '../../../components/Input'
import { Container, Row, Column } from '../../../layouts/Grid';
import { TableSet } from '../../../components/Table';
import { Alert } from '../../../components/Alert';
import { Badge } from '../../../components/Badge';
import Currency from '../../../components/Currency';
import NumberFormat from 'react-number-format';

class AdminTransactionCheckout extends Component {
    render() {
        const {
            member,
            memberData,
            memberInfo,
			isModalOpen,
            toggleModal,
            grandTotal,
            handlePaymentCheckoutSubmit,
            handleMemberAuthentication,
            handleInputChange
        } = this.props;
        
        const renderPaymentAvailability = () => {
            if(memberInfo.memberData.balance > grandTotal) {
                return (
                    <Alert theme="success" className="flex align-items--center clr-light ta-center margin-top-large">
                        <i className="ion-checkmark-circled icon icon--base margin-right-small"></i>
                        <p>Saldo customer (<span className="fw-semibold"><Currency value={memberInfo.memberData.balance} /></span>) mencukupi untuk melakukan pembayaran sebesar <span className="fw-semibold"><Currency value={grandTotal} /></span>.</p>
                    </Alert>
                )
            }

            return (
                <Alert theme="secondary" className="flex align-items--center ta-center margin-top-large">
                    <i className="ion-alert-circled icon icon--base margin-right-small"></i>
                    <p>Saldo customer (<span className="fw-semibold"><Currency value={memberInfo.memberData.balance} /></span>) tidak mencukupi untuk melakukan pembayaran sebesar <span className="fw-semibold"><Currency value={grandTotal} /></span>.</p>
                </Alert>
            )
        }
        
        const renderMemberInfo = () => {
            if(member.item.isAuthenticated) {
                return (
                    <div className="flex flex-column align-items--center">
                        { renderPaymentAvailability() }
                        <div className="margin-top-base margin-bottom-small ta-center">
                            <h4 className="clr-primary">{memberInfo.memberData.name}</h4>
                            <h5 className="fw-semibold">
                                {
                                    memberInfo.memberData.card ?
                                    <NumberFormat
                                        format="#### #### #### ####"
                                        displayType={'text'}
                                        // value={memberInfo.memberData.card ? memberInfo.memberData.card.id : null}
                                    />
                                   : null
                                }
                            </h5>
                            <Badge theme="secondary" className="clr-dark margin-top-small">
                                <small className="tt-uppercase ls-base fw-semibold">{memberInfo.memberData.card ? memberInfo.memberData.card.type.name : null}</small>
                            </Badge>
                        </div>
                    </div>
                )
            }

            if(member.item.isAuthenticating) {
                return (
                    <div className="flex flex-column justify-content--center align-items--center">
                        <p>Mengotentikasi customer...</p>
                    </div>
                )
            }

            if(member.item.isError) {
                return (
                    <div className="flex flex-column justify-content--center align-items--center">
                        <p className="clr-danger">Kartu tidak terbaca atau customer tidak terdeteksi.</p>
                    </div>
                )
            }
            
            return (
                <div className="flex flex-column justify-content--center align-items--center clr-passive">
                    <p>Silahkan gesek kartu untuk mendapatkan informasi customer.</p>
                </div>
            )
        }

        return (
            <Modal
                isOpen={isModalOpen.paymentCheckout}
                toggle={() => toggleModal('paymentCheckout')}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">
                        Proses Pembayaran
                    </h6>
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleMemberAuthentication}>
                        <FormGroup>
                            <InputGroup>
                                <InputAddon>
                                    <i className="fas fa-id-card"></i>
                                </InputAddon>
                                <Input
                                    name="memberID"
                                    type="password"
                                    onChange={(e) => handleInputChange(memberInfo, e)}
                                    placeholder="Gesek kartu..."
                                    autoFocus="true"
                                    selectOnFocus
                                />
                            </InputGroup>
                        </FormGroup>
                        { renderMemberInfo() }
                    </Form>
                </ModalBody>
                <ModalFooter className="flex justify-content--center">
                    <Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('paymentCheckout')}>
                        <small className="fw-semibold tt-uppercase ls-base">Kembali</small>
                    </Button>
                    {
                        memberInfo.memberData.balance > grandTotal
                        ? <Button type="button" buttonTheme="primary" className="clr-light margin-left-small" onClick={handlePaymentCheckoutSubmit}>
                            <small className="fw-semibold tt-uppercase ls-base">Bayar dan Cetak Struk</small>
                        </Button>
                        : null 
                    }
                </ModalFooter>
            </Modal>
        );
    }
}

export default AdminTransactionCheckout;