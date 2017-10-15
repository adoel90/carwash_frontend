import React from 'react';
import Currency from '../components/Currency';

class Card extends React.Component {
	render() {
		console.log(this.props.data);

		return (
			<div className="card">
				<div className="card__container">
					<div className="card__heading">
						<h5 className="card__title">{this.props.data.name}</h5>
						<h3 className="card__price">
							<Currency value={this.props.data.price} />
						</h3>
					</div>
					<div className="card__content">
						<p className="card__description">{this.props.data.description}</p>
					</div>
					<div className="card__footer">
						<button className="button button--primary button--full">
							<span className="tt-uppercase fw-bold ls-base">Pilih Layanan</span>
						</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Card;
