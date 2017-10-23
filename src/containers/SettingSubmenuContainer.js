import React from 'react';
import { connect } from 'react-redux';
import { fetchMember } from '../actions/member.action';
import { bindActionCreators } from 'redux';

class SettingSubmenuContainer extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.props.fetchMember();
    }

    render() {
        return <h1>Submenu</h1>;
    }
}

const mapStateToProps = (state, props) => {
	const member = state.member;

	return {
		member
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchMember: () => dispatch(fetchMember())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingSubmenuContainer);
