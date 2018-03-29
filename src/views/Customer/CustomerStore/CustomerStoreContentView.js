import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { 
	StoreMenuList, 
	StorePaymentDetail, 
	StorePaymentCheckout,
	StorePaymentReceipt
} from '../CustomerStore';
import SearchBar from '../../../components/SearchBar';
import { Button } from '../../../components/Button';
import { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Form, FormGroup } from '../../../components/Form';
import { Input, Label, InputAddon, InputGroup } from '../../../components/Input';
import { Container, Row, Column } from '../../../layouts/Grid';
import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';
import Currency from '../../../components/Currency';

class CustomerStoreContentView extends Component {
	render() {
		const {
			type,
			store,
			storeList
        } = this.props;

        console.log(this.props)

		const renderStoreMenuList = () => {
			if(store.list.isFetching) {
				return <p>Sedang memuat daftar menu. Silahkan tunggu sebentar...</p>
			}
	
			if(store.list.isLoaded) {
				return <StoreMenuList {...this.props} />
			}
		}

		return (
			<div className="inner-view">
				<Row>
					<div className="column-8">
						<div className="heading padding-bottom-2">
							<h5 className="fw-semibold">Daftar Menu {this.props.name}</h5>
							<p className="clr-passive">Pilih menu dari daftar berikut sesuai dengan yang diinginkan customer.</p>
						</div>
					</div>
				</Row>
				{ renderStoreMenuList() }
				<StorePaymentDetail {...this.props} />
				<StorePaymentCheckout {...this.props} />
				<StorePaymentReceipt {...this.props} />
			</div>
		);
	}
}

export default CustomerStoreContentView;