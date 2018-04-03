import React from 'react';
import { Redirect } from 'react-router-dom';
import { PageBlock } from '../Page';
import { PropsRoute } from '../Route';
import { Container, Row, Column } from '../../layouts/Grid';
import { ModalDialog } from '../Modal';
import Currency from '../Currency';
import MainSidenav from '../MainSidenav';
import StoreMenuContainer from '../../views/Customer/CustomerOurService/StoreMenuContainer';
// import ServiceItemList from '.';
import StoreMenuList from '.';

class Service extends React.Component {
	constructor() {
		super();
		this.renderDialog = this.renderDialog.bind(this);
		this.renderSidenav = this.renderSidenav.bind(this);
		this.renderMenuStore = this.renderMenuStore.bind(this);

		this.state = {

			storeList : {}
		}
	}

	// renderServiceType = () => {
	renderMenuStore =() => {

		const {
			// service,
			// storeList,
			match,
			store,
			dataStore,
			storeList,
			// storemenu,
			// storeActiveMenuList

		} = this.props;

		//Condition of storemenu
		if(store.storemenu.isLoaded){
			// console.log("Hai Hai Hai Hai ");
			
		}

		//Condition of "store"
		let dataStoreArrayObject = this.props.store.list.isLoaded ? this.props.store.list.data.data.result.store : null;
		const dataStores = [];
		if(store.list.isLoaded ){ 
				
			dataStoreArrayObject.map((data, i) => {
				
				let dataStore = {
					id : data.id,
					name: data.name,
				}
			
				dataStores.push(dataStore);
			});
			
			return dataStores.map((type, i) => {
			
				let path = type.name.replace(/\s+/g, '-').toLowerCase();
			
				return (
					<PropsRoute
						key={i}
						name={type.name}
						path={`${match.url}/${path}`}
						component={StoreMenuContainer}
						type={type}
						{...this.props}
					/>
				)
			})
		
		}
	};

	renderSidenav = () => {

		const {
			// storeList,
			match,
			store,
			storeList

		} = this.props;

		
		//How to get LONG JSON in React.
		let dataStoreArrayObject = store.list.isLoaded || store.storemenu.isLoaded ? this.props.store.list.data.data.result.store : null;
		
		const dataStores = []; 

		if(store.list.isLoaded || store.storemenu.isLoaded) {
			
			dataStoreArrayObject.map((data, i)=>{

				let dataStore = {
					id:data.id,
					name: data.name
				}
		
				dataStores.push(dataStore);
			})
		};

		if(dataStores.length || store.list.isLoaded || store.storemenu.isLoaded ){
			return <MainSidenav  items={dataStores} basePath={match.path} />
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
			storeList,
			store,
			member

		} = this.props;

		let firstRoutePath;

		if(storeList.active.length) {
			firstRoutePath = storeList.active[0].name.replace(/\s+/g, '-').toLowerCase();
		}

		return (
			<main className="main main--has-subheader">
			
				<Container className="padding-top-3">
					<Row>

						<Column md={2} sm={12}>
							<aside>
								{this.renderSidenav()}

								{/* { this.renderMenuStore() } */}
								{/* <Redirect from="/*" to={`${match.url}/${firstRoutePath}`} /> */}
								
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
								{/* { this.renderServiceType() } */}
								{ this.renderMenuStore() }
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
