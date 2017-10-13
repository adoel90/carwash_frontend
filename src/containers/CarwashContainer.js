import React from 'react';
import Carwash from '../components/Carwash';

class CarwashContainer extends React.Component {
	render() {
		return <Carwash {...this.props} {...this.state} />
	}
}

export default CarwashContainer;
