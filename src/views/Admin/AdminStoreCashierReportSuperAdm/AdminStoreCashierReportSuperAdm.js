import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import {AdminStoreCashierReportSuperAdmView } from '../AdminStoreCashierReportSuperAdm';

function mapStateToProps(state) {
    return {
        store: state.store,
    };
};

function mapDispatchToProps(dispatch) {
    return {    
        // getReportStoreCashierMemberDispatch: (data) => dispatch(getReportStoreCashierMember(data))
    }
};

class AdminStoreCashierReportSuperAdm extends Component{


    render (){

        return (
            
            <AdminStoreCashierReportSuperAdmView {...this.props} {...this.state}/>
        );

    };
};

export default connect( mapStateToProps, mapDispatchToProps )(AdminStoreCashierReportSuperAdm);
