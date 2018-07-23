import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { getUserList } from '../../../actions/user.action';

import {AdminStoreCashierReportSuperAdmView } from '../AdminStoreCashierReportSuperAdm';

function mapStateToProps(state) {
    return {
        store: state.store,
        user: state.user,
    };
};

function mapDispatchToProps(dispatch) {
    return {    
        getUserListDispatch: (data) => dispatch(getUserList(data))
    }
};

class AdminStoreCashierReportSuperAdm extends Component{

    constructor(){
        super();

        this.state = {

            kasirList: {}
        };
        
    };


    componentDidMount(){

        const { getUserListDispatch } = this.props;

        let requiredData = {
            access: null,
            active: false
        };
        getUserListDispatch(requiredData);
    };

    componentDidUpdate(prevProps){

        const { user } = this.props;
        const { kasirList } = this.state;
        

        if(prevProps.user.list !== user.list){

            let levelAksesIdArray = [];
            if(user.list.isLoaded){
                user.list.data.data.result.map((value) => {
                    console.log(value.level.id);
                    console.log(value.level.name);
                    levelAksesIdArray.push(value.level.id);
                });
            };


            if(user.list.isLoaded){

                levelAksesIdArray
            };

            this.setState({
                ...this.state,
                kasirList: user.list
            }, () => {
                console.log(kasirList);
            });
        };
    };

    render (){

        return (
            
            <AdminStoreCashierReportSuperAdmView {...this.props} {...this.state}/>
        );

    };
};

export default connect( mapStateToProps, mapDispatchToProps )(AdminStoreCashierReportSuperAdm);
