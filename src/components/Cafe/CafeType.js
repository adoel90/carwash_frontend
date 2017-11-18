import React, { Component } from 'react';

import { CafeMenuList, CafePaymentDetail } from '../Cafe';
import SearchBar from '../SearchBar';
import { Button } from '../Button';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, Label, InputAddon, InputGroup } from '../Input'
import { Row } from '../Grid';

class CafeType extends Component {
	constructor() {
		super();
		this.renderCafeMenuList = this.renderCafeMenuList.bind(this);
		this.renderPaymentDetailModal = this.renderPaymentDetailModal.bind(this);
	}

	renderPaymentDetailModal = () => {
		const {
			isModalOpen,
			toggleModal
		} = this.props;

		return (
			<Modal
				className="modal-dialog--large"
				isOpen={isModalOpen.paymentDetail}
				toggle={() => toggleModal('paymentDetail')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Detil Pembayaran</h6>
				</ModalHeader>
				<Form>
					<ModalContent>
						<CafePaymentDetail {...this.props} />
					</ModalContent>
					<ModalFooter></ModalFooter>
				</Form>
			</Modal>
		)
	}

	renderCafeMenuList = () => {
		const {
			cafe,
			cafeMenuList,
			type
		} = this.props;

		if(cafe.isLoaded) {
			return <CafeMenuList {...this.props} />
		}
	}

	render() {
		const {
			type,
			cafe,
			cafeMenuList
		} = this.props;

		return (
			<div className="inner-view">
				<Row>
					<div className="column-8">
						<div className="heading padding-bottom-2">
							<h5 className="fw-semibold">Daftar Menu {type.name}</h5>
							<p className="clr-passive">Pilih menu dari daftar berikut sesuai dengan yang diinginkan customer.</p>
						</div>
					</div>
				</Row>
				{ this.renderCafeMenuList() }
				{ this.renderPaymentDetailModal() }
			</div>
		);
	}
}

export default CafeType;
