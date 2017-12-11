import React, { Component } from 'react';
import { Printable } from '../Print';
import { ListGroup, ListGroupItem } from '../List';

class ServicePaymentReceipt extends Component {
    render() {
        const {
            service,
            printData
        } = this.props;
        
        const renderItemList = () => {
            return (
                <tr>
                    <td>{printData.service.name}</td>
                    <td className="ta-right">{printData.service.price}</td>
                </tr>
            )
        }

        const renderSummary = () => {
            return (
                <tbody>
                    <tr>
                        <td>Total Harga:</td>
                        <td className="ta-right fw-bold">75,000</td>
                    </tr>
                    <tr>
                        <td>Saldo Awal:</td>
                        <td className="ta-right fw-bold">75,000</td>
                    </tr>
                    <tr>
                        <td>Saldo Akhir:</td>
                        <td className="ta-right fw-bold">75,000</td>
                    </tr>
                </tbody>
            )
        }
        
        const renderReceiptBody = () => {
            return (
                <table style={{width: '100%'}}>
                    <tbody>
                        {renderItemList()}
                    </tbody>
                    {renderSummary()}
                </table>
            )
        }
        
        if(service.print.isPrinted) {
            console.log(printData);

            // return (
            //     <Printable>
            //         <div className="receipt">
            //             <div className="receipt-header ta-center margin-bottom-3">
            //                 <p className="fw-bold">805 Carwash</p>
            //                 <p>Kota Jkt Utara, Daerah Khusus Ibukota Jakarta. <br/> 0896-0457-8309</p>
            //             </div>
            //             <div className="receipt-body margin-bottom-3">
                            
            //                 {renderReceiptBody()}
            //             </div>
            //             <div className="receipt-footer ta-center">
            //                 <p className="fw-semibold">11 Desember 2017 13:46</p>
            //                 <p>Thank you and please come again soon.</p>
            //             </div>
            //         </div>
            //     </Printable>
            // );
        }

        return null;
    }
}

export default ServicePaymentReceipt;