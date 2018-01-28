import React from 'react';
import { Redirect } from 'react-router-dom';

import { PageBlock } from '../Page';
import { PropsRoute } from '../Route';
import { Container, Row } from '../Grid';
import { ModalDialog } from '../Modal';
import Currency from '../Currency';
import MainSidenav from '../MainSidenav';

import ServiceTypeContainer from '../../containers/ServiceTypeContainer';

class Service extends React.Component {
	constructor() {
		super();
		this.renderDialog = this.renderDialog.bind(this);
		this.renderSidenav = this.renderSidenav.bind(this);
		this.renderServiceType = this.renderServiceType.bind(this);
	}

	renderServiceType = () => {
		const {
			service,
			serviceTypes,
			match
		} = this.props;

		if(service.types.isLoaded) {
			return serviceTypes.active.map((type, i) => {
				let path = type.name.replace(/\s+/g, '-').toLowerCase();

				return (
					<PropsRoute
						key={i}
						name={type.name}
						path={`${match.url}/${path}`}
						component={ServiceTypeContainer}
						type={type}
						{...this.props}
					/>
				)
			})
		}
	};

	renderSidenav = () => {
		const {
			serviceTypes,
			match
		} = this.props;
		
		if(serviceTypes.active.length) {
			return <MainSidenav items={serviceTypes.active} basePath={match.path} />
		}
	}

	renderDialog = () => {
		const {
			dialog,
			dispatch,
			toggleDialog,
			isDialogOpen
		} = this.props;

		return (
			<ModalDialog
				isOpen={dialog.isOpened}
				toggle={toggleDialog}
				type={dialog.data.type}
				title={dialog.data.title}
				message={dialog.data.message}
				onConfirm={dialog.data.onConfirm}
				onClose={dialog.data.onClose}
				confirmText={dialog.data.confirmText}
				closeText={dialog.data.closeText}
			/>
		)
	}

	render() {
		const {
			match,
			memberDetail,
			service,
			serviceTypes
		} = this.props;

		let firstRoutePath;

		if(serviceTypes.active.length) {
			firstRoutePath = serviceTypes.active[0].name.replace(/\s+/g, '-').toLowerCase();
		}

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3">
					<Row>
						<aside className="sidebar column-2">
							{this.renderSidenav()}
						</aside>
						<div className="column-10">
							<div className="heading padding-bottom-1">
								<PageBlock>
										{
											memberDetail.isLoaded
											? <Row> 
												<div className="column-9">
													<h5 className="fw-medium">Selamat datang, <span className="fw-semibold">{memberDetail.data.name}.</span></h5>
													<p>Silahkan pilih layanan yang diinginkan.</p>
												</div>
												<div className="column-3 ta-center">
													<small className="tt-uppercase ls-base fw-semibold">Saldo Saya</small>
													<h5 className="fw-bold clr-primary">
														<Currency value={memberDetail.data.balance} />
													</h5>
												</div>
											</Row>
											: <p>Sedang memuat informasi Anda. Tunggu sebentar...</p>
										}
								</PageBlock>

							</div>
							{ this.renderServiceType() }
							<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
						</div>
					</Row>
				</Container>
				{ this.renderDialog() }
			</main>
		)
	}
}

export default Service;
