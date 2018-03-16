import React from 'react';
import { ServicePaymentConfirmation } from '../Service';
// import { Card, CardList, CardHeading, CardImage,CardBody, CardFooter } from '../Card';
import { Card, CardList, CardHeading, CardImage,CardBody, CardFooter } from '../../components/Card';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Button } from '../Button';
import Currency from '../Currency';
import { Icon } from '../Icon';
import { Form } from '../Form';
import { NavLink } from '../Nav';
import { default as NoThumbnail } from '../../assets/images/no-thumbnail.jpg'
import { Column, Row } from '../../layouts/Grid';

 
class ServiceItemList extends React.Component {

	constructor() {
		super();
		this.renderServiceItem = this.renderServiceItem.bind(this);
	}

	renderServiceItem = (item, i) => {
		const {
			handleServicePayment
		} = this.props;

		

		return (
			<Column key={i} md={6} sm={12}>
			{/* <div key={i} className="column-6 padding-top-2 padding-bottom-2"> */}
				<Card>
					<CardHeading align="center">
						<h5 className="card__title">{item.name}</h5>
						<h4 className="card__price">
							<Currency value={item.price} />
						</h4>
					</CardHeading>
					<CardImage src={item.image ? item.image : NoThumbnail } alt={item.title} />
					<CardBody>
						<p className="card__text">{item.description}</p>
					</CardBody>
					<CardFooter>
						<Button type="button" buttonTheme="primary" buttonFull onClick={() => handleServicePayment(item)} className="clr-light">
							<small className="tt-uppercase fw-bold ls-base">Pilih</small>
						</Button>
					</CardFooter>
				</Card>
			{/* </div> */}
			</Column>
		)
	}

	render() {

		const {
			serviceList,
			selectedService,
			storeState,
			storeList
		} = this.props;
		
		let dataStoreArrayObject = this.props.storeState.store.isLoaded ? this.props.storeState.store.data.data.result.store : null;
		// console.log(dataStoreArrayObject);

		const dataStores = [];

		if(this.props.storeState.store.isLoaded){ 
				
			dataStoreArrayObject.map((data, i) => {
				
				let dataStore = {
					id : data.id,
					name: data.name,
					status:data.status
				}
			
				dataStores.push(dataStore);
				
			});
		}
		// console.log(storeState);

		return (
			<CardList>
				{/* { serviceList.map(this.renderServiceItem) } */}
				{ dataStoreArrayObject.map(this.renderServiceItem) }
				<ServicePaymentConfirmation {...this.props} />
			</CardList>
		)
	}
}

export default ServiceItemList;
