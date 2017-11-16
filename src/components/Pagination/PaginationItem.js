import React, { Component } from 'react';
import classNames from 'classnames';

class PaginationItem extends Component {
	render() {
		const {
			children,
			className,
			active,
			disabled
		} = this.props;

		const classes = classNames(
			'pagination__item',
			active ? 'is-active' : null,
			disabled ? 'disabled' : null,
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
