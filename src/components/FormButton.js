import React from 'react';
import Button from '../components/Button';

class FormButton extends React.Component {
	render() {
		return (
			<div className="form-button">
				<Button {...this.props} />
			</div>
		);
	}
}

export default FormButton;
