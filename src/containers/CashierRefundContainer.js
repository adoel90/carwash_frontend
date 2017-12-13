import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateMember, memberRefund } from '../actions/member.action';

import { CashierRefund } from '../components/Cashier';

class CashierRefundContainer extends Component {
    constructor() {
        super();
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthenticateMember = this.handleAuthenticateMember.bind(this);
        this.handleRefund = this.handleRefund.bind(this);
        this.handleRefundSubmit = this.handleRefundSubmit.bind(this);
        
        this.state = {
            selectedMember: {},
            refund: {
                cardID: 0
            },
            isModalOpen: {
                refundConfirmation: false
            }
        }
    }

    componentDidUpdate = (prevProps) => {
        const {
            member
        } = this.props;
        
        if(prevProps.member.item !== member.item) {
            if(member.item.isAuthenticated) {
                this.state.selectedMember = member.item.data;
                this.forceUpdate();

                this.handleRefund();
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
        
        const {
            refund
        } = this.state;

        const {
            dispatch,
            accessToken,
            member
        } = this.props;

        let requiredData = {
            card: refund.cardID
        }
        
        dispatch(authenticateMember(requiredData, accessToken));
    }
    
    handleRefund = () => {
        this.toggleModal('refundConfirmation');
    }

    handleRefundSubmit = (e) => {
        e.preventDefault();

        const {
            selectedMember
        } = this.state;
        
        const {
            dispatch,
            accessToken
        } = this.props;
        
        let requiredData = {
            card: selectedMember.card.id
        }

        dispatch(memberRefund(requiredData, accessToken));
    }
    
    render() {
        return (
            <CashierRefund
                {...this.state}
                {...this.props}
                toggleModal={this.toggleModal}
                handleInputChange={this.handleInputChange}
                handleAuthenticateMember={this.handleAuthenticateMember}
                handleRefundSubmit={this.handleRefundSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        member: state.member
    }
}

export default connect(mapStateToProps)(CashierRefundContainer);