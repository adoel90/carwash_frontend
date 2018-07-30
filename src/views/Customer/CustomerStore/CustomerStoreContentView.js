import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { 
	StoreMenuList, 
	StorePaymentDetail, 
	StorePaymentCheckout,
	StorePaymentReceipt
} from '../CustomerStore';
import { SearchBar } from '../../../components/Search';
import { Button } from '../../../components/Button';
import { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Form, FormGroup } from '../../../components/Form';
import { Input, Label, InputAddon, InputGroup } from '../../../components/Input';
import { Container, Row, Column } from '../../../layouts/Grid';
import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';
import { PageBlock } from '../../../components/Page';
import Currency from '../../../components/Currency';

class CustomerStoreContentView extends Component {


	render() {
		const {
			type,
			store,
			storeList,
			memberData
        } = this.props;

		const renderStoreMenuList = () => {
			if(store.list.isFetching) {
				return <p>Sedang memuat daftar menu. Silahkan tunggu sebentar...</p>
			}
	
			if(store.storemenu.isLoaded) {
				return <StoreMenuList {...this.props} />
			}
		}

		return (
			<div>
				{/* <PageBlock className="padding-small margin-bottom-base" style={{marginLeft: '-15px', marginRight: '15px'}}>
					<Row> 
						<Column md={9}>
							<h5 className="fw-medium">Selamat datang, <h4 className="fw-semibold">{memberData.name}.</h4></h5>
							<p>Silahkan pilih menu dari daftar berikut sesuai dengan yang diinginkan</p>
						</Column>
						<Column md={3}>
							<h5 className="tt-uppercase ls-base fw-semibold">Saldo Saya</h5>
							<p className="currency currency-normal fw-bold clr-primary">
								<Currency value={memberData.balance} />
							</p>
							<p className="clr-primary">
								{memberData.card.type.name}
							</p>
						</Column>
					</Row>
				</PageBlock> */}
				{ renderStoreMenuList() }
				<StorePaymentDetail {...this.props} />
				<StorePaymentCheckout {...this.props} />
				<StorePaymentReceipt {...this.props} />
			</div>
		);
	}
}

export default CustomerStoreContentView;