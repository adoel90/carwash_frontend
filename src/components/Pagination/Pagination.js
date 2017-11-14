import React, { Component } from 'react';
import classNames from 'classnames';

class Pagination extends Component {

	render() {
		const {
			align,
			children,
			className
		} = this.props;

		const classes = classNames(
			'pagination',
			className
		)

		return (
			<div className={classes}>
				<ul className="pagination__list">
					{children}
				</ul>
			</div>
		);
	}

}

export default Pagination;
