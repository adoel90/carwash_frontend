import React from 'react';

import { connect } from 'react-redux';
import { authenticateMember } from '../actions/member.action';
import Landing from '../components/Landing';

class LandingContainer extends React.Component {
	componentDidUpdate = () => {
		console.log(this.state.cardId);
	}

	constructor() {
		super();
		this.state = {
			cardId: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (value) => {
		this.setState({
			cardId: value
		})
	}

	handleSubmit = () => {
		const { dispatch } = this.props;
		const {
			cardId
		} = this.state;

		const requiredData = {
			card: cardId
		}

		dispatch(authenticateMember(requiredData));
	}

	componentDidUpdate = () => {
		console.log(this.state.cardId);
	}

	render() {
		return (
			<Landing
				{...this.state}
				{...this.props}
				handleChange={this.handleChange}
				handleSubmit={this.handleSubmit}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		member: state.member
	}
}

export default connect(mapStateToProps)(LandingContainer);
