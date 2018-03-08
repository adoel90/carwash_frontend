import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { customerLogin } from '../../../actions/authentication.action';
import { CustomerLoginView } from '../CustomerLogin';

function mapStateToProps(state) {
    return {
        authentication: state.authentication 
    };
}

function mapDispatchToProps(dispatch) {
    return {
        customerLogin: bindActionCreators(customerLogin, dispatch)
    }
}

class CustomerLogin extends Component {

	constructor(){

		super();

		this.state = {

			authData: {
				cardID: ''
			}
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAuthentication = this.handleAuthentication.bind(this);

	};

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

		const {customerLogin } = this.props;
		const {authData } = this.state;
		
		let requireData = {
			cardID: authData.cardID
		}
		// console.log(requireData); //0011509695740738

		customerLogin(requireData);
	}

    render() {

        return (

			<CustomerLoginView 

				handleInputChange = {this.handleInputChange}
				handleAuthentication = {this.handleAuthentication}
				{...this.state} 
				{...this.props} />		
		)
    }
}

// export default CustomerLogin;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerLogin);