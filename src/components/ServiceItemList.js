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

class ServiceItemList extends React.Component {
	constructor(props) {
		super(props);
		this.renderServiceItem = this.renderServiceItem.bind(this);
		// this.toggleModal = this.toggleModal.bind(this);
		this.state = {
			isModalOpen: false
		}
	}

	// toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen })

	toggleModal = (key) => {
		const {
			isModalOpen
		} = this.state;

		this.setState({
			isModalOpen: {
				[key]: !isModalOpen
			}
		})
	}

	// toggleModal(key) {
	// 	this.setState({
	// 		isModalOpen: {
	// 			[key]: !this.state.isModalOpen
	// 		}
	// 	})
	// }

	renderServiceItem = (item, i) => {
		const { isModalOpen } = this.state;

		console.log(i);

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
						<Button buttonType="button" buttonTheme="primary" buttonFull onClick={this.toggleModal.bind(this, i)}>
							<small className="tt-uppercase fw-bold ls-base">Pilih</small>
						</Button>
					</CardFooter>

					<Modal isOpen={this.state.isModalOpen[i]} toggle={this.toggleModal.bind(this, i)}>
						<ModalHeader align="center">
							<h5 className="fw-medium">Pembayaran: <span className="clr-primary fw-bold">{item.name}</span></h5>
						</ModalHeader>
						<ModalContent>
							<div className="flex flex-column justify-content--center align-items--center ta-center">
								<h3 className="fw-semibold clr-primary"><Currency value={item.price} /></h3>
								<p>Anda memilih layanan {item.name}. Silahkan pilih bayar untuk melanjutkan.</p>
							</div>
						</ModalContent>
						<ModalFooter>
							<div className="flex justify-content--center">
								<Button buttonTheme="danger" buttonOutline className="margin-right-2" onClick={this.toggleModal.bind(this, i)}>
									<small className="fw-semibold ls-base tt-uppercase">Kembali</small>
								</Button>
								<Button buttonTheme="primary">
									<small className="fw-semibold ls-base tt-uppercase">Bayar</small>
								</Button>
							</div>
						</ModalFooter>
					</Modal>
				</Card>
			</div>
		)
	}

	render() {
		const {
			serviceList
		} = this.props;

		return (
			<CardList>
				{ serviceList.map(this.renderServiceItem) }
			</CardList>
		)
	}
}

export default ServiceItemList;
