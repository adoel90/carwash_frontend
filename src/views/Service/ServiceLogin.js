import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Alert } from '../../components/Alert';
import { Form, FormGroup } from '../../components/Form';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
// import { default as StoreIcon } from '../assets/icons/Business/store-2.svg';
import { default as StoreIcon } from '../../assets/icons/Business/store-2.svg';

function mapStateToProps(state) {
    return {

    };
}

class ServiceLogin extends Component {

    // render() {
	// 	const {
	// 		member,
	// 		match,
	// 		error,
	// 		isAuthenticated,
	// 		handleInputChange,
	// 		handleAuthentication
	// 	} = this.props;

	// 	const renderAlert = () => {
	// 		if(error.isError) {
	// 			return (
	// 				<Alert theme="danger" className="clr-light margin-bottom-2">
	// 					<p>{error.data.message}</p>
	// 				</Alert>
	// 			)
	// 		}
			
	// 	}
		
	// 	if(!isAuthenticated) {
	// 		return (
	// 			<Form onSubmit={handleAuthentication}>
	// 				<main className="main landing">
	// 					<div className="landing__container">
	// 						<img src={StoreIcon} style={{ width: '150px' }} />
	// 						<h3 className="fw-bold">Selamat datang di Carwash 805</h3>
	// 						<h5 className="padding-bottom-3 fw-semibold">Silahkan gesek kartu member Anda.</h5>
	// 						{renderAlert()}
	// 						<FormGroup>
	// 							<Input
	// 								type="number"
	// 								name="cardID"
	// 								onChange={(e) => handleInputChange('authData', e)}
	// 								autoFocus
	// 								selectOnFocus
	// 							/>
	// 						</FormGroup>
	// 					</div>
	// 				</main>
	// 			</Form>
	// 		)
	// 	}

	// 	return null;
	// }


    render() {
        return (
            <div>
                <p>This is the login page.</p>
            </div>






        );
    }
}

export default connect(
    mapStateToProps,
)(ServiceLogin);