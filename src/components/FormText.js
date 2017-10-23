import React from 'react';

class FormText extends React.Component {
	constructor() {
		super();
		this.renderLabel = this.renderLabel.bind(this);
		this.renderField = this.renderField.bind(this);
	}

	renderLabel = () => {
		return <label className="fw-medium">{this.props.label}</label>
	}

	renderField = () => {
		if(this.props.type !== 'textarea') {
			return <input type={this.props.type} className="form-control" {...this.props} />
		}
		else {
			return <textarea className="form-control" {...this.props}></textarea>
		}
	}

	render() {
		return (
			<div className="form-group">
				{ this.props.label && this.renderLabel() }
				{ this.renderField() }
			</div>
		)
	}
}

export default FormText;
