import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// import { userLogout } from '../actions/user.action';
import { userLogout } from '../../../actions/user.action';

class CustomerLogOut extends Component  {

    constructor(){
        super();

        this.handleLogOut = this.handleLogOut.bind(this);

        


    }

    componentWillMount = () => {
		this.handleLogout();
    }
    
    handleLogOut = (e) => {

        e.preventDefault();

        console.log(e);

    }

    render(){

        return null;
    }
}

export default CustomerLogOut;