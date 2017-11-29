import React from 'react';
import classNames from 'classnames';

class Card extends React.Component {
	render() {
		const {
			theme,
			children,
			className,
			buttonClick,
		} = this.props;

		const classes = classNames(
			'card',
			theme ? `card--${theme}` : null,
			className
		)

		return (
			<div className={classes}>
				<div className="card__container">
					{ children }
				</div>
			</div>
		)
	}
}

export default Card;
