import React from 'react';

const PageBlock = (props) => {
	return (
		<div className="page-block">
			<div className="page-block__container">
				{props.children}
			</div>
		</div>
	)
}

export default PageBlock;
