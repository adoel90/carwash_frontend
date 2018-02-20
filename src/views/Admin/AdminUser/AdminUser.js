import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AdminUserView } from '../AdminUser';
import { getUserList } from '../../../actions/user.action';

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserList: () => dispatch(getUserList())
    }
}

class AdminUser extends Component {
    constructor() {
        super();
        this.getUserList = this.getUserList.bind(this);
        this.state = {
            user: {},
            userList: {}
        }
    }

    componentDidMount = () => {
        this.getUserList();
    }

    componentDidUpdate = (prevProps) => {
        const {
            user
        } = this.props;
        
        if(prevProps.user.list !== user.list) {
            this.setState({
                ...this.state,
                userList: user.list
            });
        }
    }

    getUserList = () => {
        const {
            getUserList
        } = this.props;

        getUserList();
    }
    
    render() {
        return (
            <AdminUserView
                {...this.state}
                {...this.props}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUser);