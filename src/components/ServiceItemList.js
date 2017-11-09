import React from 'react';
import {
	Card,
	CardList,
	CardHeading,
	CardImage,
	CardBody,
	CardFooter
} from '../components/Card';
import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../components/Modal';
import { Button } from '../components/Button';
import Currency from '../components/Currency';
import { Icon } from '../components/Icon';
import { Form } from '../components/Form';
import { default as CashierIcon } from '../assets/icons/Business/cashier.svg';

class ServiceItemList extends React.Component {
	constructor() {
		super();
		this.renderServiceItem = this.renderServiceItem.bind(this);
		this.renderConfirmationModal = this.renderConfirmationModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			selectedService: {}
		}
	}

	selectService = (item) => {
		const { selectedService } = this.state;

		this.setState({
			selectedService: item
		});

		this.toggleModal();
	}

	toggleModal = () => {
		const {
			isModalOpen
		} = this.state;

		this.setState({
			isModalOpen: !isModalOpen
		})
	}

	handleSubmit = () => {

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
						<Button type="button" buttonTheme="primary" buttonFull onClick={this.selectService.bind(this, item)}>
							<small className="tt-uppercase fw-bold ls-base">Pilih</small>
						</Button>
					</CardFooter>
				</Card>
			</div>
		)
	}

	renderConfirmationModal = () => {
		const {
			selectedService
		} = this.state;

		return (
			<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
				<Form onSubmit={this.handleSubmit}>
					<ModalHeader align="center">
						<h5 className="fw-semibold">Pembayaran: <span className="clr-primary fw-bold">{selectedService.name}</span></h5>
					</ModalHeader>
					<ModalContent className="flex flex-column justify-content--center align-items--center ta-center">
						<img style={{ width: '150px' }} src={CashierIcon} />
						<h3 className="fw-semibold clr-primary"><Currency value={selectedService.price} /></h3>
						{/* <p className="clr-success">Saldo Anda cukup untuk melakukan pembayaran.</p> */}
						<p className="h6">Anda telah memilih layanan <span className="fw-semibold">{selectedService.name}</span>. <br /> Silahkan konfirmasi kembali pilihan Anda sebelum melanjutkan.</p>
					</ModalContent>
					<ModalFooter>
						<div className="flex">
							<Button type="button" buttonTheme="danger" className="margin-right-2" onClick={this.toggleModal} buttonFull>
								<small className="fw-semibold ls-base tt-uppercase">Batal</small>
							</Button>
							<Button type="submit" buttonTheme="primary" buttonFull>
								<small className="fw-semibold ls-base tt-uppercase">Bayar</small>
							</Button>
						</div>
					</ModalFooter>
				</Form>
			</Modal>
		)
	}

	render() {
		const {
			serviceList
		} = this.props;

		const {
			selectedService
		} = this.state;

		return (
			<CardList>
				{ serviceList.map(this.renderServiceItem) }
				{ this.renderConfirmationModal() }
			</CardList>
		)
	}
}

export default ServiceItemList;
