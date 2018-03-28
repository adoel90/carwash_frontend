import React from 'react';
// import { ServiceItemList, ServicePaymentReceipt } from '../Service';
import { StoreMenuList, ServicePaymentReceipt } from '../Service';
import { PageBlock } from '../Page';
// import { Row } from '../Grid';
import { Row } from '../../layouts/Grid';
import { Button } from '../Button';
import Currency from '../Currency';
import { default as WalletIcon } from '../../assets/icons/Business/wallet-1.svg';

class StoreMenu extends React.Component {
	

	render() {
		const {
			storeState,
			service,
			serviceList,
			type,
			member
		} = this.props;

		let dataStoreArrayObject = this.props.storeState.list.isLoaded ? this.props.storeState.list.data.data.result.store : null;
	
		const renderStoreMenuList = () => {	

			// if(service.list.isFetching){
			if(storeState.list.isFetching){
				return (
					<PageBlock className="ta-center margin-top-2">
						<p>Sedang memuat daftar layanan, mohon tunggu sebentar...</p>
					</PageBlock>
				)
			}
			
			if(storeState.list.isLoaded) {
				if(!dataStoreArrayObject.length) {
					return (
						<PageBlock className="flex flex-column ta-center justify-content--center align-items--center margin-top-2 margin-bottom-2">
							<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
							<h4 className="clr-danger">Oops!</h4>
							<p>Mohon maaf, sepertinya tidak terdapat layanan pada kategori <span className="fw-semibold">{type.name}</span> untuk saat ini.</p>
						</PageBlock>
					)
				}
				
			return <StoreMenuList {...this.props}  />
			}

			return (
				<PageBlock className="ta-center margin-top-2"> 
					<p>Oops! Sepertinya terdapat kesalahan dalam memuat daftar layanan. Silahkan hubungi operator kasir yang sedang bertugas.</p>
				</PageBlock>
			)
		}

		return (
			<div className="inner-view" id="category">
				{ renderStoreMenuList() }
				<ServicePaymentReceipt {...this.props} />
			</div>
		)
	}
}

export default StoreMenu;
