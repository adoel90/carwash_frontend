import React from 'react';
import classNames from 'classnames';

const PageBlock = (props) => {
	const {
		theme,
		extension,
		children,
		className,
		primary,
		...rest
	} = props;

	const classes = classNames(
		'page-block',
		extension ? 'page-block--extension' : null,
		className,
		theme ? `page-block--${theme}` : null,
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
