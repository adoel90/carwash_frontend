import React, { Component } from 'react';
import classNames from 'classnames';

class CardListFooter extends Component {
	render() {
		const {
			children,
			className
		} = this.props;

		const classes = classNames(
			'card-list__footer',
			className
		)

		return (
			<div className={classes}>
				{children}
			</div>
		);
	}

}

export default CardListFooter;
