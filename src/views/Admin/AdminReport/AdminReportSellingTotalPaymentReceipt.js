import React, { Component } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Printable } from '../../../components/Print';
import { ListGroup, ListGroupItem } from '../../../components/List';


class AdminReportSellingTotalPaymentReceipt extends Component {

    render (){

        const { statusPrintData, printData, user, printDataDetail, store, periodrepot } = this.props;

        const tableStyle = {
            color:  '#333',
            'font-family':' Helvetica, Arial, sans-serif',
            width: '100%',
            'border-collapse':'collapse',
            'border-spacing': '0'
        }

        const tdThStyle = {
                // border: '1px solid #CCC',
                'border-bottom': '1px solid #CCC',
                height: '30px',
               
        }

        const tdStyle = {
                'text-align': 'center',
                'border-left': '1px solid #CCC'
        }

        const tdStyleLeft = {
            'text-align': 'left',
            'border-left': '1px solid #CCC',
            'padding-left': '12px'
        }

        const trStyle = {
            // border: '1px solid #CCC'
        }

        if(statusPrintData === 200 ){

            let storeStaffKasirName = statusPrintData === 200 ? user.name : null;

            return (
    
                <Printable>
                    <div className="receipt">
                        <div className="receipt-header ta-center margin-bottom-small">
                            <div className="margin-bottom-small">
                                {/* <h5 className="fw-bold">{customerName}</h5> */}
                            </div>

                            <h1><b>805 CARWASH</b></h1>
                            <h5>LAPORAN KASIR</h5>
                        </div>
                        <div className="align-center margin-top-base margin-bottom-base">
                            <h5 className="fw-bold"><b>{storeStaffKasirName}</b></h5>
                            <p className="fw-semibold">{moment(periodrepot.to).format('YYYY-MM-DD')}</p>
                        </div>
                        


                    </div>
                </Printable>
            )
        }

        return null;

    }
}

export default AdminReportSellingTotalPaymentReceipt;