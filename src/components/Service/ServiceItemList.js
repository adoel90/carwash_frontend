import React from 'react';
import { ServicePaymentConfirmation } from '../Service';
import {
	Card,
	CardList,
	CardHeading,
	CardImage,
	CardBody,
	CardFooter
} from '../Card';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Button } from '../Button';
import Currency from '../Currency';
import { Icon } from '../Icon';
import { Form } from '../Form';
import { NavLink } from '../Nav';

import { default as NoThumbnail } from '../../assets/images/no-thumbnail.jpg'
 
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
			<div key={i} className="column-6 padding-top-2 padding-bottom-2">
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
			</div>
		)
	}

	render() {
		const {
			serviceList,
			selectedService
		} = this.props;

		return (
			<CardList>
				{ serviceList.map(this.renderServiceItem) }
				<ServicePaymentConfirmation {...this.props} />
			</CardList>
		)
	}
}

export default ServiceItemList;
