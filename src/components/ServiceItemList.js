import React from 'react';
import {
	Card,
	CardList,
	CardHeading,
	CardImage,
	CardBody,
	CardFooter
} from '../components/Card';
import { Modal, ModalHeader, ModalFooter } from '../components/Modal';
import Button from '../components/Button';
import Currency from '../components/Currency';

class ServiceItemList extends React.Component {
	constructor(props) {
		super(props);
		this.renderServiceItem = this.renderServiceItem.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.state = {
			isModalOpen: false
		}
	}

	toggleModal() {
		this.setState({ isModalOpen: !this.state.isModalOpen })
	}

	renderServiceItem = (item, i) => {
		const { isModalOpen } = this.state;

		return (
			<div key={i} className="column-6 padding-top-2 padding-bottom-2">
				<Card>
					<CardHeading>
						<h6 className="card__title">{item.name}</h6>
						<h4 className="card__price">
							<Currency value={item.price} />
						</h4>
					</CardHeading>
					<CardImage src={item.image} alt={item.title} />
					<CardBody>
						<p className="card__text">{item.description}</p>
					</CardBody>
					<CardFooter>
						<Button buttonType="button" buttonStyle="primary" buttonFull onClick={this.toggleModal}>
							<small className="tt-uppercase fw-bold ls-base">Pilih</small>
						</Button>
					</CardFooter>
				</Card>
			</div>
		)
	}

	render() {
		const {
			serviceList
		} = this.props;

		const {
			isModalOpen
		} = this.state;

		return (
			<div>
				<CardList>
					{ serviceList.map(this.renderServiceItem) }
					<Modal isOpen={isModalOpen} toggle={this.toggleModal}>
						<ModalHeader>
							<h4>Tes aja bos</h4>
						</ModalHeader>
						<ModalFooter>
							<Button buttonStyle="danger" onClick={this.toggleModal}>Close</Button>
						</ModalFooter>
					</Modal>
				</CardList>
			</div>
		)
	}
}

export default ServiceItemList;
