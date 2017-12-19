import React, { Component } from 'react';
import moment from 'moment';
import { Printable } from '../Print';
import { ListGroup, ListGroupItem } from '../List';
import NumberFormat from 'react-number-format';

class ServicePaymentReceipt extends Component {
    render() {
        const {
            service,
            printData
        } = this.props;
        
        const renderItemList = () => {
            if(printData.service) {
                return (
                    <table style={{width: '100%'}} className="margin-bottom-1">
                        <tbody>
                            <tr>
                                <td>{printData.service.name}</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
				                        displayType={'text'}
                                        value={printData.service.price} 
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
        }

        const renderSummary = () => {
            if(printData.service) {
                return (
                    <table style={{width: '100%'}}>
                        <tbody>
                            <tr>
                                <td>Total Harga:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        value={printData.service.price} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Saldo Awal:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        value={parseInt(printData.service.price) + parseInt(printData.member.balance)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Saldo Akhir:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        value={printData.member.balance}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
        }
        
        if(service.print.isPrinting) {
            return <p>Tunggu sebentar...</p>
        }
        
        if(service.print.isPrinted) {
            return (
                <Printable>
                    <div className="receipt">
                        <div className="receipt-header ta-center margin-bottom-3">
                            <div className="margin-bottom-3">
                                <h5 className="fw-bold">{printData.id}</h5>
                            </div>
                            <p className="fw-bold">805 Carwash</p>
                            <p>Kota Jkt Utara, Daerah Khusus Ibukota Jakarta. <br/> 0896-0457-8309</p>
                        </div>
                        <div className="receipt-body margin-bottom-3" style={{padding: '15px'}}> 
                            {renderItemList()}
                            {renderSummary()}
                        </div>
                        <div className="receipt-footer ta-center">
                            <div className="margin-bottom-2">
                                <p className="fw-semibold">For Customer <br/>{printData.member ? printData.member.name : null}</p>
                            </div>
                            <p className="fw-semibold">{moment(printData.date).format('LLL')}</p>
                            <p>Thank you and please come again soon.</p>
                        </div>
                    </div>
                </Printable>
            );
        }

        return null;
    }
}

export default ServicePaymentReceipt;