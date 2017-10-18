import React from 'react';

const Button = ({buttonType, buttonStyle, buttonSize, children}) => {
	return (
		<button type={buttonType} className={`button button--${buttonStyle} button--${buttonSize} `}>
			{ children }
		</button>
	)
}

export default Button;
