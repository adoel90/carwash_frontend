import React from 'react';
import Currency from '../components/Currency';

class Card extends React.Component {
	render() {
		console.log(this.props.data);

		return (
			<div className="card">
				<div className="card__container">
					<div className="card__heading">
						<h6 className="card__title">{this.props.data.name}</h6>
						<h4 className="card__price">
							<Currency value={this.props.data.price} />
						</h4>
					</div>
					<figure className="card__image">
						<img src={this.props.data.photo} />
					</figure>
					<div className="card__content">
						<p className="card__description">{this.props.data.description}</p>
					</div>
					<div className="card__footer">
						<button className="button button--primary button--full">
							<small className="tt-uppercase fw-bold ls-base">Pilih Layanan</small>
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;
