import React from 'react';
import { Container, Row } from '../components/Grid';
import { PageBlock } from '../components/Page';
import { default as CardIcon } from '../assets/icons/Business/credit-card-3.svg';
import { default as Store } from '../assets/icons/Business/store-3.svg';
import { Form, FormGroup } from '../components/Form';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

class Landing extends React.Component {
	constructor() {
		super();
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount = () => {
		document.addEventListener('keydown', this.handleKeyPress);
		document.addEventListener('keyup', this.handleKeyPress);
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.handleSubmit();
	}

	handleChange = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checkbox : target.value;
		const name = target.name;

		this.props.handleChange(value);
	}

	componentDidUpdate = () => {
		if(this.props.member.data) {
			window.location.reload();
		}

		console.log(this.props.member);
	}

	render() {
		const {
			member,
			match
		} = this.props;

		return (
			<Form onSubmit={this.handleSubmit}>
				<main className="main landing">
					<div className="landing__container">
						<img src={CardIcon} style={{ width: '200px' }} />
						<h3 className="fw-bold">Selamat datang di Carwash 805</h3>
						<h5 className="padding-bottom-3">Silahkan gesek kartu member Anda.</h5>
						<FormGroup>
							<Input
								type="number"
								name="cardId"
								onChange={this.handleChange}
								autoFocus
								selectOnFocus
							/>
						</FormGroup>
						{/* <Button type="button" buttonTheme="secondary" disabled="true">
							<small className="tt-uppercase ls-base fw-semibold clr-dark">Kartu belum terdeteksi</small>
						</Button> */}
					</div>


					{/* <PageBlock primary className="flex align-items--center justify-content--center ta-center">
					<img src={Store} className="column-8" />
					<h4 className="fw-bold tt-uppercase ls-base">Carwash 805</h4>
					<h5 className="fw-semibold">Member Area</h5>
				</PageBlock> */}
				</main>

			</Form>
		)
	}
}

export default Landing;
