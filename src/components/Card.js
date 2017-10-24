import React from 'react';
import Currency from '../components/Currency';
import Button from '../components/Button';

class Card extends React.Component {
	render() {
		return (
			<div className="card">
				<div className="card__container">
					<div className="card__heading">
						<h6 className="card__title">{this.props.title}</h6>
						<h4 className="card__price">
							<Currency value={this.props.price} />
						</h4>
					</div>
					<figure className="card__image figure">
						<img src={this.props.photo} alt={this.props.title} />
					</figure>
					<div className="card__content">
						<p className="card__text">{this.props.text}</p>
					</div>
					<div className="card__footer">
						<Button buttonType="button" buttonStyle="primary" buttonFull>
							<small className="tt-uppercase fw-bold ls-base">{this.props.buttonText}</small>
						</Button>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;
