import React from 'react';

import Landing from '../components/Landing';

class LandingContainer extends React.Component {
	render() {
		return <Landing {...this.state} {...this.props}/>
	}
}

export default LandingContainer;
