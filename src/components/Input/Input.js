import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = (props, tag) => {
	const {
		className,
		type,
		rows,
		...attributes
	} = props;

	const classes = classNames(
		className,
		'form-control'
	)

	const fileInput = type === 'file';
	const textareaInput = type === 'textarea';
	const selectInput = type === 'select';
	let Tag = textareaInput || selectInput ? type : 'input';

	if(Tag === 'input') {
		attributes.type = type;
	}

	return <Tag className={classes} {...attributes} />;
}

export default Input;
