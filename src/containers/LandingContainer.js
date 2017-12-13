import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { authenticateMember } from '../actions/member.action';
import Landing from '../components/Landing';

class LandingContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			authData: {
				cardID: ''
			}
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);
	}

	componentDidUpdate = (prevProps) => {
		const {
			member,
			history,
			handleAuthentication
		} = this.props;

		if(prevProps.member !== this.props.member) {
			if(member.item.isAuthenticated) {
				window.location.reload();
			}
		}
	}

	handleInputChange = (object, e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		this.setState({
			[object]: {
				[name]: value
			}
		});
	}

	handleAuthentication = (e) => {
		e.preventDefault();
		
		const { 
			dispatch 
		} = this.props;

		const {
			authData
		} = this.state;

		const requiredData = {
			card: authData.cardID
		}

		dispatch(authenticateMember(requiredData));
	}

	render() {
		return (
			<Landing
				{...this.state}
				{...this.props}
				handleInputChange={this.handleInputChange}
				handleAuthentication={this.handleAuthentication}
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
