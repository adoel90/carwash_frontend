import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Input extends React.Component {
	// handleChange = (event) => {
	// 	this.props.onChange(event);
	// }

	render() {
		const {
			className,
			type,
			rows,
			value,
			...attributes
		} = this.props;

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

		return <Tag {...attributes} className={classes} />;
	}
//
// const Input = (props, tag) => {
//
// 	const {
// 		className,
// 		type,
// 		rows,
// 		onChange,
// 		...attributes
// 	} = this.props;
//
// 	const classes = classNames(
// 		className,
// 		'form-control'
// 	)
//
// 	const fileInput = type === 'file';
// 	const textareaInput = type === 'textarea';
// 	const selectInput = type === 'select';
// 	let Tag = textareaInput || selectInput ? type : 'input';
//
// 	if(Tag === 'input') {
// 		attributes.type = type;
// 	}
//
// 	return <Tag className={classes} {...attributes} onChange={this.handleChange} />;
}

export default Input;
