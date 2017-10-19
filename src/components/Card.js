import React from 'react';
import Currency from '../components/Currency';

class Card extends React.Component {
	constructor() {
		super();
		this.renderCardDescription = this.renderCardDescription.bind(this);
	}

	renderCardDescription = () => {
		return (
			<p className="card__description">{this.props.description}</p>
		)
	}

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
					<figure className="card__image">
						<img src={this.props.photo} alt={this.props.title} />
					</figure>
					<div className="card__content">
						{ this.props.description && this.renderCardDescription() }
					</div>
					<div className="card__footer">
						<button className="button button--primary button--full">
							<small className="tt-uppercase fw-bold ls-base">{this.props.buttonText}</small>
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;
