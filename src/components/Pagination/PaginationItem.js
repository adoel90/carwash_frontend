import React, { Component } from 'react';
import classNames from 'classnames';

class PaginationItem extends Component {
	render() {
		const {
			children,
			className,
			isActive
		} = this.props;

		const classes = classNames(
			'pagination__item',
			isActive ? 'is-active' : null,
			className
		)

		return (
			<li className={classes} {...this.props}>
				<a className="pagination__link">
					{children}
				</a>
			</li>
		);
	}

}

export default PaginationItem;
