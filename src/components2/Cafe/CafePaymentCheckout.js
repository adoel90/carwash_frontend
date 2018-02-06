import React, { Component } from 'react';
import { Button } from '../Button';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, Label, InputAddon, InputGroup } from '../Input'
import { Row } from '../Grid';
import { TableSet } from '../Table';
import { Alert } from '../Alert';
import { Badge } from '../Badge';
import Currency from '../Currency';
import NumberFormat from 'react-number-format';

class CafePaymentCheckout extends Component {
    render() {
        const {
            member,
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
                    <Alert theme="success" className="flex align-items--center clr-light ta-center">
                        <i className="ion-checkmark-circled icon icon--base margin-right-2"></i>
                        <p>Saldo customer (<span className="fw-semibold"><Currency value={memberInfo.memberData.balance} /></span>) mencukupi untuk melakukan pembayaran sebesar <span className="fw-semibold"><Currency value={grandTotal} /></span>.</p>
                    </Alert>
                )
            }

            return (
                <Alert theme="secondary" className="flex align-items--center ta-center">
                    <i className="ion-alert-circled icon icon--base margin-right-2"></i>
                    <p>Saldo customer (<span className="fw-semibold"><Currency value={memberInfo.memberData.balance} /></span>) tidak mencukupi untuk melakukan pembayaran sebesar <span className="fw-semibold"><Currency value={grandTotal} /></span>.</p>
                </Alert>
            )
        }
        
        const renderMemberInfo = () => {
            if(member.item.isAuthenticated) {
                return (
                    <div className="flex flex-column align-items--center">
                        { renderPaymentAvailability() }
                        <div className="margin-top-3 margin-bottom-1 ta-center">
                            <h5 className="clr-primary">{memberInfo.memberData.name}</h5>
                            <h6 className="fw-semibold">
                                <NumberFormat
                                    format="#### #### #### ####"
                                    displayType={'text'}
                                    value={memberInfo.memberData.card ? memberInfo.memberData.card.id : null}
                                   />
                            </h6>
                            <Badge theme="secondary" className="clr-dark margin-top-1">
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
                <ModalContent>
                    <Form onSubmit={handleMemberAuthentication}>
                        <FormGroup>
                            <InputGroup>
                                <InputAddon>
                                    <i className="ion-card"></i>
                                </InputAddon>
                                <Input
                                    name="memberID"
                                    type="number"
                                    onChange={(e) => handleInputChange(memberInfo, e)}
                                    placeholder="Gesek kartu..."
                                    autoFocus="true"
                                    selectOnFocus
                                />
                            </InputGroup>
                        </FormGroup>
                        { renderMemberInfo() }
                    </Form>
                </ModalContent>
                <ModalFooter className="flex justify-content--center">
                    <Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('paymentCheckout')}>
                        <small className="fw-semibold tt-uppercase ls-base">Kembali</small>
                    </Button>
                    {
                        memberInfo.memberData.balance > grandTotal
                        ? <Button type="button" buttonTheme="primary" className="clr-light margin-left-2" onClick={handlePaymentCheckoutSubmit}>
                            <small className="fw-semibold tt-uppercase ls-base">Bayar dan Cetak Struk</small>
                        </Button>
                        : null 
                    }
                </ModalFooter>
            </Modal>
        );
    }
}

export default CafePaymentCheckout;