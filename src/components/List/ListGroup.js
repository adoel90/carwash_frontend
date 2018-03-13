import React, { Component } from 'react';
import classNames from 'classnames';

class ListGroup extends Component {
	render() {
		const {
			className,
			children
		} = this.props;

		const classes = classNames(
			'list-group',
			className
		)

		return (
			<ul className={classes}>
				{children}
			</ul>
		);
	}
}

export default ListGroup;
