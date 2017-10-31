import React from 'react';
import {
	Card,
	CardList,
	CardHeading,
	CardImage,
	CardBody,
	CardFooter
} from '../components/Card';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '../components/Modal';
import Button from '../components/Button';
import Currency from '../components/Currency';

class ServiceItemList extends React.Component {
	constructor(props) {
		super(props);
		this.renderServiceItem = this.renderServiceItem.bind(this);
		this.state = {
			isModalOpen: false
		}
	}

	toggleModal(i) {
		this.setState({
			isModalOpen: {
				[i]: !this.state.isModalOpen
			}
		})
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
						<Button buttonType="button" buttonStyle="primary" buttonFull onClick={this.toggleModal.bind(this, i)}>
							<small className="tt-uppercase fw-bold ls-base">Pilih</small>
						</Button>
					</CardFooter>

				</Card>
				<Modal isOpen={isModalOpen[i]} toggle={this.toggleModal.bind(this, i)}>
					<ModalHeader>
						<h5>Pembayaran</h5>
					</ModalHeader>
					<ModalContent>
						<div className="flex flex-column justify-content--center align-items--center ta-center">
							<h3 className="fw-semibold clr-primary"><Currency value={item.price} /></h3>
							<p>Gesek kartu Anda untuk melanjutkan pembayaran dan tombol akan berubah menjadi biru. Selanjutnya tekan tombol biru untuk mencetak struk pembayaran</p>
						</div>
					</ModalContent>
					<ModalFooter>
						<div className="flex justify-content--center">
							<Button buttonStyle="primary" onClick={this.toggleModal.bind(this, i)} className="margin-right-2">
								<small className="fw-semibold ls-base tt-uppercase">Coba</small>
							</Button>
							<Button buttonStyle="primary" onClick={this.toggleModal.bind(this, i)}>
								<small className="fw-semibold ls-base tt-uppercase">Bayar</small>
							</Button>
						</div>
					</ModalFooter>
				</Modal>
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
				</CardList>
			</div>
		)
	}
}

export default ServiceItemList;
