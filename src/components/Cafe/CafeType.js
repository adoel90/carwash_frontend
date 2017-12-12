import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { 
	CafeMenuList, 
	CafePaymentDetail, 
	CafePaymentCheckout,
	CafePaymentReceipt
} from '../Cafe';
import SearchBar from '../SearchBar';
import { Button } from '../Button';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, Label, InputAddon, InputGroup } from '../Input'
import { Row } from '../Grid';
import { default as CardIcon } from '../../assets/icons/Business/credit-card-3.svg';
import Currency from '../Currency';

class CafeType extends Component {
	render() {
		const {
			type,
			cafe,
			cafeList
		} = this.props;

		const renderCafeMenuList = () => {
			if(cafe.list.isFetching) {
				return <p>Sedang memuat daftar menu. Silahkan tunggu sebentar...</p>
			}
	
			if(cafe.list.isLoaded) {
				return <CafeMenuList {...this.props} />
			}
		}

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
				{ renderCafeMenuList() }
				<CafePaymentDetail {...this.props} />
				<CafePaymentCheckout {...this.props} />
				<CafePaymentReceipt {...this.props} />
			</div>
		);
	}
}

export default CafeType;
