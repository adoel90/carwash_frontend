import React from 'react';
import { Redirect } from 'react-router-dom';

// import { PageBlock } from '../Page';
import { PageBlock } from '../Page';
import { PropsRoute } from '../Route';
// import { Container, Row } from '../Grid';
import { Container, Row, Column } from '../../layouts/Grid';
import { ModalDialog } from '../Modal';
import Currency from '../Currency';
import MainSidenav from '../MainSidenav';

// import ServiceTypeContainer from '../../containers/ServiceTypeContainer';
import ServiceTypeContainer from '../../views/Customer/CustomerOurService/ServiceTypeContainer';

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
			match,
			storeState
		} = this.props;



		/*
		Service.js

				GW MESTI TESTING API :
				
					- CREATE STORE
					
					- UPDATE STORE

					- CREATE MENU STORE

					- LIST MENU STORE




		*/

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
			// serviceTypes,
			match,
			storeState
		} = this.props;
	
		//How to get LONG JSON in React.
		let dataStoreArrayObject = this.props.storeState.store.isLoaded ? this.props.storeState.store.data.data.result.store : null;
		
        const dataStores = []; 

        if(this.props.storeState.store.isLoaded ) {
            dataStoreArrayObject.map((data, i)=>{

                let dataStore = {
                    id:data.id,
                    name: data.name
                }
                dataStores.push(dataStore);
            })
        };

		if(dataStores.length){
		
			return <MainSidenav items={dataStores} basePath={match.path} />
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
			serviceTypes,
			storeState,
			member,
		} = this.props;

		let firstRoutePath;

		if(serviceTypes.active.length) {
			firstRoutePath = serviceTypes.active[0].name.replace(/\s+/g, '-').toLowerCase();
		}

		return (
			<main className="main main--has-subheader">
				<Container className="padding-top-3">
					<Row>

						<Column md={2} sm={12}>
							<aside>
								{this.renderSidenav()}
								
							</aside>
						</Column>

						<Column md={10} sm={12}>
							<div>
								<div className="heading padding-bottom-1">

									<PageBlock>
											{
												member.item.isLoaded ? 
												<Row> 
													<Column md={9} sm={12}>
														<div>
															<h3 className="fw-medium">Selamat datang, <span className="fw-semibold">{member.item.data.result.name}.</span></h3>
															<p>Silahkan pilih layanan yang Anda inginkan.</p>
														</div>
													</Column>
													<Column md={3} sm={12}>
														<div>
															<small className="tt-uppercase ls-base fw-semibold">Saldo Anda</small>
															<h5 className="fw-bold clr-primary">
															<Currency value={member.item.data.result.balance} />
															</h5>
														</div>
													</Column>
												</Row>
												: <p>Sedang memuat informasi Anda. Tunggu sebentar...</p>
											}
									</PageBlock>

								</div>
								{ this.renderServiceType() }
								<Redirect from="/*" to={`${match.url}/${firstRoutePath}`} />
							</div>
						</Column>
					</Row>
				</Container>
				{ this.renderDialog() }
			</main>
		)
	}
}

export default Service;
