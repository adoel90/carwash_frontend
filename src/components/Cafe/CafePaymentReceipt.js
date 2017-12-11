import React, { Component } from 'react';
import { Printable } from '../Print';
import { ListGroup, ListGroupItem } from '../List';

class CafePaymentReceipt extends Component {
    render() {
        const renderItemList = () => {
            return (
                <tbody>
                    <tr>
                        <td>Paket Smart Wash</td>
                        <td className="ta-right">18,000</td>
                    </tr>
                    <tr>
                        <td>Paket Smart Wash</td>
                        <td className="ta-right">18,000</td>
                    </tr>
                </tbody>
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
                    {renderItemList()}
                    {renderSummary()}
                </table>
                
                // <ListGroupItem>
                //     <p className="fw-bold">Paket Smart Wash</p>
                //     <p className="ta-right">Rp 18,000</p>
                // </ListGroupItem>
            )
        }
        
        return (
            <Printable>
                <div className="receipt">
                    <div className="receipt-header ta-center margin-bottom-3">
                        <p className="fw-bold">805 Carwash</p>
                        <p>Kota Jkt Utara, Daerah Khusus Ibukota Jakarta. <br/> 0896-0457-8309</p>
                    </div>
                    <div className="receipt-body margin-bottom-3">
                        {renderReceiptBody()}
                    </div>
                    <div className="receipt-footer ta-center">
                        <p className="fw-semibold">11 Desember 2017 13:46</p>
                        <p>Thank you and please come again soon.</p>
                    </div>
                </div>
            </Printable>
        );
    }
}

export default CafePaymentReceipt;