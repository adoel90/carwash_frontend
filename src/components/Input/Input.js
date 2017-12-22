import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentDidMount = () => {
		const {
			type
		} = this.props;

		if(type == 'number') {
			const inputElement = ReactDOM.findDOMNode(this.input);
			inputElement.addEventListener('mousewheel', this.handleScroll);
		}
	}

	handleScroll = (e) => {
		e.preventDefault();
	}

	handleFocus = (e) => {
		e.preventDefault();
		e.target.select();
	}

	render() {
		const {
			className,
			type,
			rows,
			value,
			size,
			selectOnFocus,
			...attributes,
		} = this.props;

		const classes = classNames(
			className,
			'form-control',
			size ? `form-control--${size}` : null
		)

		const fileInput = type === 'file';
		const textareaInput = type === 'textarea';
		const selectInput = type === 'select';
		let Tag = textareaInput || selectInput ? type : 'input';

		if(type === 'date') {
			Tag = DatePicker;
		}

		if(Tag === 'input') {
			attributes.type = type;
		}

		if(selectOnFocus) {
			attributes.onFocus = this.handleFocus;
		}

		return <Tag {...attributes} {...this.props} ref={(input) => this.input = input} className={classes} />;
	}
}

export default Input;
