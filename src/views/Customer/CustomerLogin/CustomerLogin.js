import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { customerLogin } from '../../../actions/authentication.action';
import { Alert } from '../../../components/Alert';
import { CustomerLoginView } from '../CustomerLogin';

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
		this.renderAlert = this.renderAlert.bind(this);

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

		customerLogin(requireData).then(() => {
			window.location.reload();
		});
	}

	renderAlert = () => {
		const {
			authentication
		} = this.props;

		if(authentication.isError) {
            let msgError = authentication.error ? authentication.error : null;
			
			return (
                <Alert theme="warning" className="ta-center margin-bottom-2 clr-danger">
                    <p>{msgError.response.data.message}</p>
                </Alert>
            )
        }
	}

    render() {
        return (
			<CustomerLoginView 
				{...this.state} 
				{...this.props} 
				handleInputChange = {this.handleInputChange}
				handleAuthentication = {this.handleAuthentication}
				renderAlert={this.renderAlert}
				/>		
		)
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        customerLogin: bindActionCreators(customerLogin, dispatch)
    }
}

// export default CustomerLogin;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerLogin);