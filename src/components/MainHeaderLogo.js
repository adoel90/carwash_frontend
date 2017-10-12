import React from 'react';

const MainHeaderLogo = (props) => {
	return (
		<div className="header__logo">
			<span className="heading-6 tt-uppercase fw-bold ls-base">{ props.text }</span>
		</div>
	);
}

export default MainHeaderLogo;
