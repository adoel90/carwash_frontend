import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../../actions/authentication.action';

class CustomerLogOut extends Component  {

    constructor(){
        super();

        this.handleLogOut = this.handleLogOut.bind(this);

    }

    componentDidMount () {
        this.props.action.logout().then(() => {
			window.location.reload();
		});
    }

    render(){

        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        authentication : state.authentication
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		action : bindActionCreators({ logout }, dispatch)
	}
}

// export default CustomerLogOut;
export default connect(mapStateToProps, mapDispatchToProps)(CustomerLogOut);