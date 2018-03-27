import React, { Component } from 'react';
// import { StoreCashierNewCardView } from '../StoreCashierNewCard';
import  {CashierNewCard}  from '../../../components/Cashier';

class StoreCashierNewCard extends Component {

    render() {
        
        //return <StoreCashierNewCardView {...this.state} {...this.props} />

        return (
			<CashierNewCard
				{...this.props}
				{...this.state}
				toggleModal={this.toggleModal}
				handleInputChange={this.handleInputChange}
				handleChangeCardType={this.handleChangeCardType}
				handleNewCardSubmit={this.handleNewCardSubmit}
				handleNewCardConfirmationSubmit={this.handleNewCardConfirmationSubmit}
				handleNewCardInstructionSubmit={this.handleNewCardInstructionSubmit}
			/>
		);
    }
}

export default StoreCashierNewCard;