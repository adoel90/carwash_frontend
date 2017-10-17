import React from 'react';
import Cafe from '../components/Cafe';

class CafeContainer extends React.Component {
	render() {
		return <Cafe {...this.state} {...this.props} />
	}
}

export default CafeContainer;
