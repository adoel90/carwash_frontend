import React from 'react';
import { connect } from 'react-redux';

class SettingsCafeContainer extends React.Component {
	constructor() {
		super();
	}

	render() {
		return <SettingsCafe
			{...this.state} 
			{...this.props}
		/>
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe
	}
}

export default connect(mapStateToProps)(SettingsCafeContainer);