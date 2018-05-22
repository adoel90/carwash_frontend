import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticateMember } from '../../../actions/member.action';
import { AdminStoreCashierCheckSaldoView } from '../AdminStoreCashierCheckSaldo';

function mapStateToProps (state){
    return {
        member: state.member,
        dialog: state.dialog
    }
}

function mapDispatchToProps(dispatch){
    return {
        authenticateMemberDispatch: (data) => dispatch(authenticateMember(data))
    }
}

class AdminStoreCashierCheckSaldo extends Component{

    constructor(){
        super();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthenticateMember = this.handleAuthenticateMember.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleToggleCheckSaldo= this.handleToggleCheckSaldo.bind(this);

        this.state = {
            checksaldo: {
                cardID: 0
            },
            isModalOpen:{
                saldoConfirmation: false
            },
            selectedMember: {}
        }
    }

    componentDidUpdate(prevProps){

        const { member } = this.props;
        const { toggleModal } = this.state;

        if(prevProps.member.item !== member.item){
            // console.log(member);
            if(member.item.isAuthenticated) {
                this.state.selectedMember = member.item.data;
                this.forceUpdate();
                this.handleToggleCheckSaldo();
            }
        }
    }

    toggleModal = (name) => {
		const { isModalOpen } = this.state;

		this.setState({
			isModalOpen: {
				...isModalOpen,
				[name]: !isModalOpen[name]
			}
		})
	}

    handleInputChange = (object, e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
            [object]: {
                [name]: value
            }
        })
    }

    handleAuthenticateMember = (e) => {
        e.preventDefault();
        const { authenticateMemberDispatch } = this.props;
        const { checksaldo } = this.state;

        let firstData = checksaldo.cardID.replace('%', "");
        let finalDataCardId = firstData.replace('?', "");
        
        let requiredData = { card: finalDataCardId }
        authenticateMemberDispatch(requiredData);
    }

    handleToggleCheckSaldo = () => {
        this.toggleModal('saldoConfirmation');
    }

    render(){

        return (
            <div>
                <AdminStoreCashierCheckSaldoView 
                    {...this.state} 
                    {...this.props} 
                    handleInputChange={this.handleInputChange}
                    handleAuthenticateMember={this.handleAuthenticateMember}
                    toggleModal={this.toggleModal}
                />
            </div>
        )
    }
}   

export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreCashierCheckSaldo);