import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Card = props => {
    const {
        tag: Tag,
        className,
        children,
        ...attributes
    } = props;

    attributes.className = classNames(
        'card',
        className
    );
    
    return <Tag {...attributes}>{children}</Tag>
};

Card.defaultProps = {
    tag: 'div'
}

Card.propTypes = {
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default Card;
// class Card extends React.Component {
// 	render() {
// 		const {
// 			theme,
// 			children,
// 			className,
// 			buttonClick,
// 		} = this.props;

// 		const classes = classNames(
// 			'card',
// 			theme ? `card--${theme}` : null,
// 			className
// 		)

// 		return (
// 			<div className={classes}>
// 				<div className="card__container">
// 					{ children }
// 				</div>
// 			</div>
// 		)
// 	}
// }

// export default Card;
