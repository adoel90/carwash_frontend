import React from 'react';

class FormText extends React.Component {
	constructor() {
		super();
		this.renderLabel = this.renderLabel.bind(this);
	}

	renderLabel() {
		return <label className="fw-medium">{this.props.label}</label>
	}

	render() {
		return (
			<div className="form-group">
				{ this.props.label && this.renderLabel() }
				<input type="text" className="form-control" {...this.props} />
			</div>
		)
	}
}

export default FormText;
