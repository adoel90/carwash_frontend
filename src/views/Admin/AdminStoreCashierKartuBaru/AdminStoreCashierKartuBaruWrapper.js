import React, { Component } from 'react';
import { ModalHeader, ModalContent, ModalFooter, Modal} from '../../../components/Modal';
import { Container, Row } from '../../../layouts/Grid';
import { Form, FormGroup } from '../../../components/Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../../../components/Input';
import { PageBlock } from '../../../components/Page';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';
// import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';
import { default as CardIcon2 } from '../../../assets/icons/Business/credit-card-6.svg';
import Currency from '../../../components/Currency';
import NumberFormat from 'react-number-format';

import { AdminStoreCashierKartuBaruConfirmationModal, AdminStoreCashierKartuBaruPaymentReceipt } from '../AdminStoreCashierKartuBaru';
import { AdminStoreCashierKartuBaruView } from '../AdminStoreCashierKartuBaru';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';

class AdminStoreCashierKartuBaruWrapper extends Component {

	render() {

		return (
			<div className="inner-view">
				<Panel className="ta-center">
					<PanelBody>
						<img src={CardIcon2} style={{width: '150px'}}/>
						<Row className="flex flex-column padding-bottom-small">
							<h3 className="fw-semibold">Kartu Baru</h3>
							<p className="clr-dark-light">Silahkan gesek kartu untuk membuat Kartu Member Baru pada kolom berikut.</p><br />
						</Row>
						
						<AdminStoreCashierKartuBaruView {...this.props}  handleInputChange={this.props.handleInputChange}/>
					</PanelBody>
				</Panel>

				<AdminStoreCashierKartuBaruConfirmationModal {...this.props} {...this.state}/>
				
				
			</div>
		);
	}
}

export default AdminStoreCashierKartuBaruWrapper;
