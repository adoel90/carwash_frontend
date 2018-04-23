import React, { Component } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Printable } from '../../../components/Print';
import { ListGroup, ListGroupItem } from '../../../components/List';

class AdminStoreCashierReportPaymentReceipt extends Component {

    render (){

        const { statusPrintData, printData, user, printDataDetail, store, period } = this.props;
        // console.log(printDataDetail);
        // console.log(user);

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
                            {/* <p className="fw-semibold">{moment(new Date).format('LLL')}</p> */}
                            <p className="fw-semibold">{moment(period.to).format('YYYY-MM-DD')}</p>

                        </div>
                        <div className="receipt-body margin-bottom-small">
                            <table style={tableStyle}>
                                <tr>
                                        <th style={tdThStyle}>Customer</th>
                                        <th style={tdThStyle}>Total </th>
                                </tr>
                                { store.reportCashierMember.isLoaded ? store.reportCashierMember.data.result.data.map((value) => {
                                    return (
                                        <tr>
                                            <td style={tdThStyle, tdStyle}> {value.member? value.member.name : null}</td>
                                            <td style={tdThStyle, tdStyle}> {value.total}</td>
                                        </tr>
                                    )
                                }): null }
                            </table>
                        </div>
    
                        <div className="receipt-footer ta-center">
                            <div className="margin-bottom-small">
                                
                            </div>
                        </div>
                    </div>
                </Printable>
            )
        }

        return null;
    }
}

export default AdminStoreCashierReportPaymentReceipt;