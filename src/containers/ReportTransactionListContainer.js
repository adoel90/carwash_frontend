import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReportTransactionList } from '../components/Report';

class ReportTransactionListContainer extends Component {
    render() {
        return (
            <ReportTransactionList
                {...this.state}
                {...this.props}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        report: state.report
    }
}

export default connect(mapStateToProps)(ReportTransactionListContainer);
