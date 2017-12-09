import React from 'react';
import { ServiceItemList } from '../Service';
import { PageBlock } from '../Page';
import { Row } from '../Grid';
import { Button } from '../Button';
import Currency from '../Currency';
import { default as WalletIcon } from '../../assets/icons/Business/wallet-1.svg';

class ServiceType extends React.Component {
	render() {
		const {
			service,
			serviceList,
			type,
			member
		} = this.props;

		const renderServiceItemList = () => {			
			if(service.list.isFetching) {
				return (
					<PageBlock className="ta-center margin-top-2">
						<p>Sedang memuat daftar layanan, mohon tunggu sebentar...</p>
					</PageBlock>
				)
			}
			
			if(service.list.isLoaded) {
				if(!serviceList.length) {
					return (
						<PageBlock className="flex flex-column ta-center justify-content--center align-items--center margin-top-2 margin-bottom-2">
							<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
							<h4 className="clr-danger">Oops!</h4>
							<p>Mohon maaf, sepertinya tidak terdapat layanan pada kategori <span className="fw-semibold">{type.name}</span> untuk saat ini.</p>
						</PageBlock>
					)
				}

				return <ServiceItemList {...this.props}  />
			}

			return (
				<PageBlock className="ta-center margin-top-2">
					<p>Oops! Sepertinya terdapat kesalahan dalam memuat daftar layanan. Silahkan hubungi operator kasir yang sedang bertugas.</p>
				</PageBlock>
			)
		}

		return (
			<div className="inner-view" id="category">
				{ renderServiceItemList() }
			</div>
		)
	}
}

export default ServiceType;
