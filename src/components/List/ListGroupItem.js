import React, { Component } from 'react';
import classNames from 'classnames';

class ListGroupItem extends Component {
	render() {
		const {
			className,
			children
		} = this.props;

		const classes = classNames(
			'list-group-item',
			className
		)

		return (
			<li className={classes}>
				{children}
			</li>
		);
	}

}

export default ListGroupItem;
