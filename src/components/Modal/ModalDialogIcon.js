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
				return 'flaticon-warning clr-danger'
				break;
			}
		}
	}

	render() {
		const {
			className
		} = this.props;

		const classes = classNames(
			'icon icon--gigant',
			'fi',
			this.handleIcon()
		)

		return <i className={classes}></i>
	}

}

export default ModalDialogIcon;
