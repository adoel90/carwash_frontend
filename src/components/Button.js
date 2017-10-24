import React from 'react';

const Button = ({buttonType, buttonStyle, buttonSize, buttonFull, children}) => {
	return (
		<button 
			type={buttonType} 
			className={`button button--${buttonStyle} button--${buttonSize} ${buttonFull && 'button--full'} `}>
			{ children }
		</button>
	)
}

export default Button;
