import React, { Component } from 'react';
import classNames from 'classnames';

class TableHeading extends Component {
	render() {
		const {
			children,
			className,
			theme
		} = this.props;

		const classes = classNames(
			theme ? `thead--${theme}` : null,
			className
		)

		return (
			<thead className={classes}>
				<tr>
					{children}
				</tr>
			</thead>
		)
	}
}

export default TableHeading;
