import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMember } from '../actions/member.action';

import SettingCustomer from '../components/SettingCustomer';

class SettingCustomerContainer extends React.Component {
    componentDidMount() {
        this.props.fetchMember();
    }

    render() {
        console.log(this.props);
        return this.props.member.isLoaded ? <SettingCustomer {...this.props} {...this.state} />
        : null;
    }
}

const mapStateToProps = (state, props) => {
    const member = state.member;
	const memberList = state.member.items.data;

	return {
		member,
        memberList
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
		fetchMember: () => dispatch(fetchMember())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingCustomerContainer);
