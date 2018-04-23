import React, { Component } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Printable } from '../../../components/Print';
import { ListGroup, ListGroupItem } from '../../../components/List';

class AdminStoreStaffPaymentReceipt extends Component {


    render(){

        const { statusPrintData, printData, user, idStore, period} = this.props;
        const tableStyle = {
            'color':  '#333',
            'font-family':' Helvetica, Arial, sans-serif',
            'width': '100%',
            'border-collapse':'collapse',
            'border-spacing': '0'
        }

        const tdThStyle = {
                // border: '1px solid #CCC',
                'border-bottom': '1px solid #CCC',
                height: '30px'
        }

        const tdStyle = {
                'text-align': 'center'
        }

        if(statusPrintData === 200 ){

            let storeStaffName = statusPrintData === 200 ? user.name : null;

            return (
                <Printable>
                    <div className="receipt">
                        <div className="receipt-header ta-center margin-bottom-small">
                            <div className="margin-bottom-small">
                                {/* <h5 className="fw-bold">{customerName}</h5> */}
                            </div>
                            {/* <h4 className="fw-bold"><b>805 CARWASH</b></h4> */}
                            <h1><b>805 CARWASH</b></h1>
                            <h6>LAPORAN HARIAN STAFF</h6>
                        </div>
                        <div className="align-center margin-top-base margin-bottom-base">
                            <h5 className="fw-bold">{idStore.name}</h5> 
                            <h5 className="fw-bold"><b>{storeStaffName}</b></h5>
                            <p className="fw-semibold">{moment(new Date).format('LLL')}</p>
                            {/* <p className="fw-semibold">{moment(period.to).format('YYYY-MM-DD')}</p> */}
                            
                        </div>
                        <div className="receipt-body margin-bottom-small">
                            {/* <table style={{width: '100%'}}>
                                <tbody>
                                    <tr className="padding-bottom-small">
                                        <td>Tipe Kartu : </td>
                                        <td className="ta-right"><p>{cardType}</p></td>
                                    </tr>
                                </tbody>
                            </table> */}

                            <table style={tableStyle}>
                                <tr>
                                        <th style={tdThStyle}>No. Invoice</th>
                                        <th style={tdThStyle}>Total </th>
                                </tr>
                                { printData.map((value) => {
                                    // console.log(value);
                                    return(
                                        <tr>
                                            <td style={tdThStyle, tdStyle}> {value.queue}</td>
                                            <td style={tdThStyle, tdStyle}> {value.total}</td>
                                        </tr>
                                    )
                                }) }
                            </table>
                        </div>
    
                        <div className="receipt-footer ta-center">
                            <div className="margin-bottom-small">
                                {/* <p className="fw-semibold">For Customer <br/>{printData.status === 200 ? printData.result.member.name : null}</p> */}
                            </div>
                            {/* <p className="fw-semibold">{moment(new Date).format('LLL')}</p> */}
                            <p>
                                {/* Thank you :) */}
                            </p>
                        </div>
                    </div>
                </Printable>
            )
        }

        return null;
    }
}

export default AdminStoreStaffPaymentReceipt;