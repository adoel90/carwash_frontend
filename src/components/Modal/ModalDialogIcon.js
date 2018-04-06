import React, { Component } from 'react';
import classNames from 'classnames';

class ModalDialogIcon extends Component {
	constructor() {
		super();
		this.handleIcon = this.handleIcon.bind(this);
	}

	handleIcon = () => {
		const {
			type
		} = this.props;

		switch(type) {
			case "confirm": {
				return 'fa-exclamation-circle fa-7x clr-danger'
				break;
			}

			case "success": {
				return 'fa-check-circle fa-7x clr-success'
				break;
			}

			case "danger": {
				return 'fa-exclamation-circle fa-7x clr-danger'
				break;
			}
		}
	}

	render() {
		const {
			className
		} = this.props;

		const classes = classNames(
			'fas',
			this.handleIcon()
		)

		return <i className={classes}></i>
	}

}

export default ModalDialogIcon;
