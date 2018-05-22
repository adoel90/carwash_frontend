import React, { Component } from 'react';
import { Panel, PanelBody, PanelHeader } from '../../../components/Panel';
import { PageBlock, PageBlockGroup } from '../../../components/Page';
import { Form, FormGroup } from '../../../components/Form';
import { Input, InputGroup, InputAddon, Label } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
import { AdminStoreChasierCheckSaldoConfirmation } from '../AdminStoreCashierCheckSaldo';



class AdminStoreCashierCheckSaldoView extends Component{

    render(){

        const { handleAuthenticateMember, handleInputChange, checksaldo, member} = this.props


        const renderAlertError = () => {
			if(member.isError || member.item.isError) {
				return (
					<Alert theme="danger" className="flex align-items--center clr-light margin-bottom-small">
						<i className="ion-alert-circled margin-right-small icon icon--base"></i>
						<p className="fw-semibold">{member.item.error.response.data.message}</p>
					</Alert>
				)
			}
        }
        
        return (
            <div className="inner-view">
				<Panel>
					<PanelHeader extension>
						<h4 className="fw-bold">Cek Saldo</h4>
						<p className="clr-passive">Harap gesek kartu atau masukkan ID kartu member untuk check saldo saat ini.</p>
					</PanelHeader>
                    <PanelBody>
                        
                        { renderAlertError() }
						
                        <Form name="refund" onSubmit={handleAuthenticateMember}>
							<FormGroup>
								<InputGroup>
									<InputAddon>
										<i className="fas fa-id-card"></i>
									</InputAddon>
									<Input
										type="number"
										name="cardID"
										placeholder="16-digit nomor kartu member"
										required="true"
										autoFocus
										selectOnFocus
										onChange={(e) => handleInputChange('checksaldo', e)}
									/>
								</InputGroup>
							</FormGroup>
							<div className="flex justify-content--flex-end margin-top-large">
								<Button theme="primary">
									<small className="fw-semibold tt-uppercase ls-base clr-light">Cari</small>
								</Button>
							</div>
						</Form>
                    </PanelBody>
                </Panel>

                <AdminStoreChasierCheckSaldoConfirmation {...this.props} />

            </div> 
        )
    }
}

export default AdminStoreCashierCheckSaldoView;