import React from 'react';

const CardImage = (props) => {
	const {
		children,
		src,
		alt
	} = props;

	return (
		<figure className="card__image figure">
			<img src={src} alt={alt} />
		</figure>
	)
}

export default CardImage;
