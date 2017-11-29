import React, { Component } from 'react';
import { PageBlock } from '../Page';

class ReportTransactionList extends Component {
	constructor() {
		super();
		this.renderTransactionList = this.renderTransactionList.bind(this);
	}

	renderTransactionList = (item, i) => {
		return <p>{item.menu.name}</p>
	}

    render() {
    	const {
    		report,
    		transactionList
    	} = this.props;

    	if(transactionList.length) {
    		return (
    		    <PageBlock>
    		    	{transactionList.map(this.renderTransactionList)}
    		    </PageBlock>
    		);
    	}

    	return null;
    }
}

export default ReportTransactionList;
