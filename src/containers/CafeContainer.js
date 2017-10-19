import React from 'react';
import Cafe from '../components/Cafe';

class CafeContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			categories: [
				{ title: 'Cafe Siang', name: 'lunch' },
				{ title: 'Cafe Dinner', name: 'dinner' },
			],
			items: [
				{
					name: 'Nasi Goreng',
					category: 'dinner',
					price: '20000',
					photo: 'https://us.123rf.com/450wm/lenyvavsha/lenyvavsha1509/lenyvavsha150900676/45819266-indonesian-nasi-goreng-with-chicken-shrimp-and-vegetables-close-up.jpg?ver=6'
				},
				{
					name: 'Indomie Goreng',
					category: 'lunch',
					price: '20000',
					photo: 'https://us.123rf.com/450wm/lenyvavsha/lenyvavsha1509/lenyvavsha150900676/45819266-indonesian-nasi-goreng-with-chicken-shrimp-and-vegetables-close-up.jpg?ver=6'
				},
			]
		}
	}

	render() {
		return <Cafe {...this.state} {...this.props} />
	}
}

export default CafeContainer;
