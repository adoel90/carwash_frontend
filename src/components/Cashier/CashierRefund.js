import React, { Component } from 'react';
import { CashierRefundConfirmation } from '../Cashier';

import { PageBlock, PageBlockGroup } from '../Page';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';

class CashierRefund extends Component {
    render() {
        const {
            member,
            refund,
            handleInputChange,
            handleAuthenticateMember
        } = this.props;

        const renderAlert = () => {
            if(member.isError) {
                return (
                    <Alert theme="danger" className="flex align-items--center clr-light margin-bottom-2">
                        <i className="ion-alert-circled margin-right-2 icon icon--base"></i>
                        <p className="fw-semibold">{member.error.message}</p>
                    </Alert>
                )
            }
        }
        
        return (
            <div className="inner-view">
                <PageBlockGroup>
                    <PageBlock extension>
                        <h5 className="fw-semibold">Refund Kartu</h5>
                        <p className="clr-passive">Harap gesek kartu atau masukkan ID kartu member yang ingin direfund pada kolom yang telah tersedia.</p>
                    </PageBlock>
                    <PageBlock>
                        { renderAlert() }
                        <Form name="refund" onSubmit={handleAuthenticateMember}>
                            <FormGroup>
                                <InputGroup>
                                    <InputAddon>
                                        <i className="ion-card"></i>
                                    </InputAddon>
                                    <Input
                                        type="number"
                                        name="cardID"
                                        placeholder="16-digit nomor kartu member"
                                        required="true"
                                        autoFocus
                                        selectOnFocus
                                        onChange={(e) => handleInputChange('refund', e)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="flex justify-content--flex-end">
                                <Button buttonTheme="primary">
                                    <small className="fw-semibold tt-uppercase ls-base clr-light">Cari</small>
                                </Button>
                            </div>
                        </Form>
                    </PageBlock>
                </PageBlockGroup>
                
                {/** Render Modals */}
                <CashierRefundConfirmation {...this.props} />
            </div>
        );
    }
}

export default CashierRefund;