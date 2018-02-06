import React, { Component } from 'react';
import moment from 'moment';
import { Printable } from '../Print';
import { ListGroup, ListGroupItem } from '../List';
import NumberFormat from 'react-number-format';

class CafePaymentReceipt extends Component {
    render() {
        const {
            cafe,
            printData,
            selectedMenuList,
            grandTotal
        } = this.props;
        
        const renderItem = (item, i) => {
            return (
                <tr>
                    <td className="padding-right-1">{item.quantity}</td>
                    <td>{item.name}</td>
                    <td className="ta-right">
                        <NumberFormat
                            thousandSeparator={true}
                            displayType={'text'}
                            value={item.totalPrice}
                        />
                    </td>
                </tr>
            )
        }
        
        const renderItemList = () => {
            if(printData.menu) {
                return (
                    <table className="margin-bottom-2" style={{width: '100%'}}>
                        <tbody>
                            {selectedMenuList.map(renderItem)}
                        </tbody>
                    </table>
                )
            }
        }


        const renderSummary = () => {
            if(printData.member) {
                return (
                    <table style={{width: '100%'}}>
                        <tbody>
                            <tr>
                                <td>Total Harga:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        value={grandTotal} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Saldo Awal:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        value={parseInt(grandTotal) + parseInt(printData.member.balance)}
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
        
        if(cafe.print.isPrinted) {
            return (
                <Printable>
                    <div className="receipt">
                        <div className="receipt-header ta-center margin-bottom-3">
                            <div className="margin-bottom-3">
                                <h5 className="fw-bold">{printData.queue}</h5>
                            </div>
                            <p className="fw-bold">805 Carwash</p>
                            <p>Jln. Raya Pegangsaan 2 no 23-B <br/> 0896-0457-8309 <br/> 021-957-362-77</p>
                        </div>
                        <div className="receipt-body margin-bottom-3">
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

export default CafePaymentReceipt;