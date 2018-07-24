import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { getUserList } from '../../../actions/user.action';
import { getReportStoreCashierMember } from '../../../actions/store.action';

import {AdminStoreCashierReportSuperAdmView } from '../AdminStoreCashierReportSuperAdm';

function mapStateToProps(state) {
    return {
        store: state.store,
        user: state.user,
    };
};

function mapDispatchToProps(dispatch) {
    return {    
        getUserListDispatch: (data) => dispatch(getUserList(data)),
        getReportStoreCashierMemberDispatch : (data) => dispatch(getReportStoreCashierMember(data))
    }
};

class AdminStoreCashierReportSuperAdm extends Component{

    constructor(){
        super();
        this.handleClickChange = this.handleClickChange.bind(this);

        this.state = {
            kasirList: {},  
            showHideIntefaceReport: false,

            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            period: {
                from: moment(),
        		to: moment()
            }, 
            report: {},
            printData: {},
            printDataDetail:{},
            statusPrintData: null
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
            if(user.list.isLoaded){
                
                let levelAksesIdArray = [];

                user.list.data.data.result.map((value) => {
                    // console.log(value);
                    if(value.level.id === 3){

                        levelAksesIdArray.push(value);
                        this.setState({
                            ...this.state,
                            kasirList: levelAksesIdArray
                        }, () => {
                            console.log(this.state.kasirList);
                        });
                    } else {
                        // console.log("TAK ADA KASIR ID");
                    };
                });

              
            };
        };
    };

    //#
    handleClickChange = (e) => {

        const target = e.target;
        const name = target.name;
        const value = target.value;

        let requireData = {
            start_date : '',
            end_date : '',
            user: value,
            print: null
        };

        const { getReportStoreCashierMemberDispatch } = this.props;
        getReportStoreCashierMemberDispatch(requireData);

        //#
        this.setState({
            ...this.state,
            showHideIntefaceReport: true
        });
    };

    render (){

        return (
            
            <AdminStoreCashierReportSuperAdmView 
                handleClickChange = {this.handleClickChange}
                {...this.props} 
                {...this.state}/>
        );

    };
};

export default connect( mapStateToProps, mapDispatchToProps )(AdminStoreCashierReportSuperAdm);
