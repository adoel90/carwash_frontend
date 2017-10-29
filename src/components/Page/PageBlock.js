import React from 'react';
import classNames from 'classnames';

const PageBlock = (props) => {
	const {
		children,
		className,
		primary,
		...rest
	} = props;

	const classes = classNames(
		'page-block',
		className,
		primary ? 'page-block--primary' : null
	)

	return (
		<div {...rest} className={classes}>
			<div className="page-block__container">
				{children}
			</div>
		</div>
	)
}

export default PageBlock;
