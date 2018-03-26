import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { StoreCashierTopUpModalView } from '../StoreCashierTopUp';

function mapStateToProps(state) {
    return {
        authentication: state.authentication 
    };
}

class StoreCashierTopUpModal extends Component {

    constructor(){
        super();


    }

    componentDidMount(){
        const {authentication } = this.props;

        console.log(authentication);
        
    }
    // componentDidUpdate(prevProps){
    //     const {authentication } = this.props;

    //     if(prevProps.authentication.userData !== authentication.userData){
    //         console.log("Get Member auth02");
            
    //     }

    // }

    render(){

        // const { isModalOpen } = this.props;

        return (

            <StoreCashierTopUpModalView  {...this.state} {...this.props} 
               
            />
        )
    }
}

export default connect(
    mapStateToProps
)(StoreCashierTopUpModal);