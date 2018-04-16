import React, { Component } from 'react';
import { Panel, PanelBody, PanelHeader } from '../../../components/Panel';
import { PageBlock, PageBlockGroup } from '../../../components/Page';
import { Form, FormGroup } from '../../../components/Form';
import { Input, InputGroup, InputAddon, Label } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
import { CashierRefundConfirmation } from '../AdminStoreCashierRefund';

class CashierRefund extends Component {

	
	render() {
		const {
			member,
			refund,
			handleInputChange,
			handleAuthenticateMember
		} = this.props;

		const renderAlert = () => {
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
						<h4 className="fw-bold">Refund Kartu</h4>
						<p className="clr-passive">Harap gesek kartu atau masukkan ID kartu member yang ingin direfund pada kolom yang telah tersedia.</p>
					</PanelHeader>
					<PanelBody>
						{ renderAlert() }
						<Form name="refund" onSubmit={handleAuthenticateMember}>
							<FormGroup>
								<InputGroup>
									<InputAddon>
										<i className="fas fa-id-card"></i>
									</InputAddon>
									<Input
										type="password"
										name="cardID"
										placeholder="16-digit nomor kartu member"
										required="true"
										autoFocus
										selectOnFocus
										onChange={(e) => handleInputChange('refund', e)}
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
				
				<CashierRefundConfirmation {...this.props} />
			</div>
		);
	}
}

export default CashierRefund;