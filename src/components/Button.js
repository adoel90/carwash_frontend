import React from 'react';

const Button = ({type, style, size, children}) => {
	return (
		<button type={type} className={`button button--${style} button--${size} `}>
			{ children }
		</button>
	)
}

export default Button;
