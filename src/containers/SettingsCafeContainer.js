import React from 'react';
import { connect } from 'react-redux';
import { getCafeTypes } from '../actions/cafe.action';
import { SettingsCafe } from '../components/Settings';

class SettingsCafeContainer extends React.Component {

	componentDidMount = () => {
		this.props.getCafeTypes();
	}

	render() {
		return (
			<SettingsCafe
				{...this.state}
				{...this.props}
			/>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cafe: state.cafe
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	const { accessToken } = ownProps;

	return {
		getCafeTypes: () => dispatch(getCafeTypes(accessToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsCafeContainer);
