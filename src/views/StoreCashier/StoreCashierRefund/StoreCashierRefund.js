import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { StoreCashierRefundView } from '../StoreCashierRefund';
import { CashierRefund, CashierRefundFirst} from '../../../components/Cashier';
import { kasirTopUpLogin } from '../../../actions/store.action';//Scenario-nya kasir meminta customer untuk GESEK KARTU MEMBER
import { memberRefund } from '../../../actions/member.action';

function mapStateToProps(state) {
    return {
        // authentication: state.authentication 
        storeState: state.store
        // dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        kasirTopUpLoginDispatch: bindActionCreators(kasirTopUpLogin, dispatch),
        memberRefundDispatch: (data) => dispatch(memberRefund(data))
        // openDialogDispatch:(data) =>  dispatch(openDialog(data)),
        // closeDialogDispatch: (data) => dispatch(closeDialog(data)),
        // memberTopupDispatch: (data) => dispatch(memberTopup(data))
    }
}

class StoreCashierRefund extends Component {

    constructor(){
        super();
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleRefundSubmit = this.handleRefundSubmit.bind(this);
        // this.memberRefund = this.memberRefund.bind(this)

        this.state = {
            selectedMemberRefund:{},
			authData: {
				cardID: ''
            },
            
            // authenticatedMember: {
			// 	data: {},
			// 	isAuthenticated: false
            // },

            isModalOpen: {
                refund: false,
                // topupConfirm: false
            }
        }
    }

    //#Get data member yang sedang REFUND 
    componentDidUpdate(prevProps){

        const { storeState } = this.props;
        const { isModalOpen } = this.state;

        if(prevProps.storeState.userData !== storeState.userData){
            if(storeState.isAuthenticated){

                this.state.selectedMemberRefund = storeState.userData.member;
                this.forceUpdate();
                this.handleTopUp();    
        
            }   
        }
    }	

    handleAuthentication = (e) => {

        e.preventDefault();
        const {kasirTopUpLoginDispatch } = this.props;
		const {authData } = this.state;
        
        let requireData = {
            cardID: authData.cardID
        }

        console.log(requireData);
        
    
        // this.toggleModal("topup");
        kasirTopUpLoginDispatch(requireData);
    }

    handleInputChange = (object, e) => {
    	const target = e.target;
		const value = target.value;
        const name = target.name;
        
        if(object) {
			object[name] = value;
			this.forceUpdate();
		} else {
			this.setState({
				[name]: value
			})
		}
    }

    toggleModal = (name) => {

        console.log(name);
        const { isModalOpen } = this.state;

        this.setState({
            isModalOpen: {
                ...isModalOpen,
                [name] : !isModalOpen[name]
            }
        })
    }
       
    handleTopUp = () => {
        this.toggleModal('refund');
        console.log("Hai hai ");
        
    }

    handleRefundSubmit = (e) => {
        e.preventDefault();

        const { selectedMemberRefund } = this.state;
        
        const { dispatch, accessToken, memberRefundDispatch } = this.props;
        
        let requiredData = {
            card: selectedMemberRefund.card.id
        }

        // dispatch(memberRefund(requiredData, accessToken));
        memberRefundDispatch(requiredData);
    }

    //

    render() {
        // return <StoreCashierRefundView {...this.state} {...this.props} />

        // return (
        //     <div>
        //         <CashierRefund 
        //             {...this.state} 
        //             {...this.props} 
        //             handleInputChange={this.handleInputChange}
        //             handleAuthentication= {this.handleAuthentication}
        //             toggleModal = {this.toggleModal}
                

        //         />

        //     </div>
        // )
        
         return (
            <div>
                <CashierRefundFirst 
                    {...this.state} 
                    {...this.props} 
                    handleInputChange={this.handleInputChange}
                    handleAuthentication= {this.handleAuthentication}
                    toggleModal = {this.toggleModal}
                />
            </div>
        )
        
       

    }
}

// export default StoreCashierRefund;
export default connect( mapStateToProps, mapDispatchToProps)(StoreCashierRefund);