import React, { Component } from 'react';
import classNames from 'classnames';

class InputSwitch extends Component {
	render() {
		const {
			onChange,
			className,
			value,
			...attributes,
		} = this.props;

		return (
			<div className="form-switch">
				<label className={`switch-label ${value ? 'switch-label--is-checked' : null}`}>
					<span className="switch-track"></span>
					<input type="checkbox" style={{ display: 'none' }} {...attributes} {...this.props} />
				</label>
			</div>
		)
	}

}

export default InputSwitch;
