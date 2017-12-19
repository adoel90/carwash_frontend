import React, { Component } from 'react';
import classNames from 'classnames';

class InputSwitch extends Component {
	render() {
		const {
			onChange,
			className,
			value,
			fullWidth,
			...attributes,
		} = this.props;

		const classes = classNames(
			'form-switch',
			fullWidth ? 'form-switch--full' : null,
			className
		)

		return (
			<div className={classes}>
				<label className={`switch-label ${value ? 'switch-label--is-checked' : null}`}>
					<span className="switch-track"></span>
					<input type="checkbox" style={{ display: 'none' }} {...attributes} {...this.props} />
				</label>
			</div>
		)
	}

}

export default InputSwitch;
