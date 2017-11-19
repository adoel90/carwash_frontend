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
import { NavLink } from '../components/Nav';
import { default as CashierIcon } from '../assets/icons/Business/cashier.svg';

class ServiceItemList extends React.Component {
	constructor() {
		super();
		this.toggleDialog = this.toggleDialog.bind(this);

		this.handleServiceTransaction = this.handleServiceTransaction.bind(this);
		this.handleLogout = this.handleLogout.bind(this);

		this.renderServiceItem = this.renderServiceItem.bind(this);
		this.renderConfirmationModal = this.renderConfirmationModal.bind(this);
		this.renderModalContent = this.renderModalContent.bind(this);
		this.renderModalFooter = this.renderModalFooter.bind(this);
		this.renderSuccessDialog = this.renderSuccessDialog.bind(this);

		this.state = {
			isModalOpen: false,
			isDialogOpen: false,
			selectedService: {}
		}
	}

	handleLogout = (e) => {
		e.preventDefault();

		this.props.handleMemberLogout();
	}

	toggleDialog = () => {
		this.setState({
			isDialogOpen: !this.state.isDialogOpen
		})

	}

	renderSuccessDialog = () =>{
		const {
			isDialogOpen
		} = this.state;

		return (
			<Modal isOpen={isDialogOpen}>
				<ModalContent className="flex flex-column align-items--center justify-content--center ta-center">
					<i className="fi flaticon-success clr-success icon icon--gigant"></i>
					<h5 className="fw-semibold">Berhasil!</h5>
					<p>Dimohon untuk menunggu struk pembayaran tercetak secara menyeluruh sebelum diambil. Terima kasih.</p>
				</ModalContent>
				<ModalFooter>
					<NavLink to="/logout">
						<Button type="button" buttonTheme="success" buttonFull className="clr-light">
							<small className="fw-semibold tt-uppercase ls-base">Selesai</small>
						</Button>
					</NavLink>
				</ModalFooter>
			</Modal>
		)
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

	handleServiceTransaction = (e) => {
		const {
			selectedService
		} = this.state;

		e.preventDefault();


		this.props.handleServiceTransaction(selectedService.id);

		this.toggleDialog();
	}

	renderModalContent = () => {
		const { member } = this.props;
		const { selectedService } = this.state;

		if(member.balance > selectedService.price) {
			return (
				<ModalContent className="flex flex-column justify-content--center align-items--center ta-center">
					<img style={{ width: '150px' }} src={CashierIcon} />
					<div className="padding-bottom-2">
						<h3 className="fw-semibold clr-primary"><Currency value={selectedService.price} /></h3>
						{/* <p className="fw-semibold">
							Saldo Anda saat ini adalah <span className="fw-bold clr-primary"><Currency value={member.balance} /></span>
						</p> */}
					</div>
					{/* <p className="clr-success">Saldo Anda cukup untuk melakukan pembayaran.</p> */}
					<p className="h6">Anda memilih layanan <span className="fw-semibold">{selectedService.name}</span>. <br /> Silahkan konfirmasi kembali pilihan Anda sebelum melanjutkan.</p>
				</ModalContent>
			)
		}
		else {
			return (
				<ModalContent className="flex flex-column justify-content--center align-items--center ta-center">
					{/* <h3 className="fw-semibold clr-primary"><Currency value={selectedService.price} /></h3> */}
					<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
					<h6 className="clr-danger">Maaf, saldo Anda tidak cukup untuk melakukan pembayaran. <br/> Silahkan lakukan top-up terlebih dahulu di kasir.</h6>
				</ModalContent>
			)
		}
	}

	renderModalFooter = () => {
		const { member } = this.props;
		const { selectedService } = this.state;

		if(member.balance > selectedService.price) {
			return (
				<ModalFooter>
					<div className="flex">
						<Button type="button" buttonTheme="danger" onClick={this.toggleModal} className="clr-light margin-right-2" buttonFull>
							<small className="fw-semibold ls-base tt-uppercase">Batal</small>
						</Button>
						<Button type="submit" buttonTheme="primary" buttonFull className="clr-light">
							<small className="fw-semibold ls-base tt-uppercase">Bayar</small>
						</Button>
					</div>
				</ModalFooter>
			)
		} else {
			return (
				<ModalFooter>
					<div className="flex">
						<Button type="button" buttonTheme="danger" onClick={this.toggleModal} buttonFull  className="clr-light">
							<small className="fw-semibold ls-base tt-uppercase">Kembali</small>
						</Button>
					</div>
				</ModalFooter>
			)
		}
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
						<Button type="button" buttonTheme="primary" buttonFull onClick={this.selectService.bind(this, item)} className="clr-light">
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
				<Form onSubmit={this.handleServiceTransaction}>
					<ModalHeader align="center">
						<h5 className="fw-semibold">Pembayaran: <span className="clr-primary fw-bold">{selectedService.name}</span></h5>
					</ModalHeader>
					{this.renderModalContent()}
					{this.renderModalFooter()}
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
				{this.renderSuccessDialog()}
			</CardList>
		)
	}
}

export default ServiceItemList;
