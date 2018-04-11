import React, { Component } from 'react';
import moment from 'moment';
import { Printable } from '../../../components/Print';
import { ListGroup, ListGroupItem } from '../../../components/List';
import NumberFormat from 'react-number-format';

class AdminTransactionPrint extends Component {
    render() {
        const {
            store,
            printData,
            selectedMenuItem,
            dataTransaction,
            grandTotal
        } = this.props;
        
        const renderItem = (item, i) => {
            let totalPrice = parseFloat(item.totalPrice)+((parseFloat(item.totalPrice)*parseFloat(dataTransaction.markup))/100);

            return (
                <tr>
                    <td className="padding-right-1">{item.quantity}</td>
                    <td>{item.name}</td>
                    <td className="ta-right">
                        <NumberFormat
                            thousandSeparator={true}
                            displayType={'text'}
                            value={totalPrice}
                        />
                    </td>
                </tr>
            )
        }
        
        const renderItemList = () => {
            if(printData.result.menu) {
                return (
                    <table className="margin-bottom-large" style={{width: '100%'}}>
                        <tbody>
                            {selectedMenuItem.map(renderItem)}
                        </tbody>
                    </table>
                )
            }
        }


        const renderSummary = () => {
            if(printData.result.member) {
                let total = parseFloat(grandTotal)+((parseFloat(grandTotal)*parseFloat(dataTransaction.markup))/100);
                return (
                    <table style={{width: '100%'}}>
                        <tbody>
                            <tr>
                                <td>Diskon:</td>
                                <td className="ta-right">
                                    {dataTransaction.discount}%
                                </td>
                            </tr>
                            <tr>
                                <td>Total Harga:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        value={total} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Saldo Awal:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        value={parseInt(total) + parseInt(printData.result.member.balance)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Saldo Akhir:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        value={printData.result.member.balance}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )

            }
        }
        
        if(store.print.isPrinted) {
            if(printData.status === 200) {
                return (
                    <Printable>
                        <div className="receipt">
                            <div className="receipt-header ta-center margin-bottom-large margin-top-large">
                                <div className="margin-bottom-large">
                                    <h5 className="fw-bold">{printData.result.queue}</h5>
                                </div>
                                <p className="fw-bold">805 Carwash</p>
                                <p>Jln. Raya Pegangsaan 2 no 23-B <br/> 0896-0457-8309 <br/> 021-957-362-77</p>
                            </div>
                            <div className="receipt-body margin-bottom-large">
                                {renderItemList()}
                                {renderSummary()}
                            </div>
                            <div className="receipt-footer ta-center">
                                <div className="margin-bottom-small">
                                    <p className="fw-semibold">For Customer <br/>{printData.result.member ? printData.result.member.name : null}</p>
                                </div>
                                <p className="fw-semibold">{moment(printData.result.date).format('LLL')}</p>
                                <p>Thank you and please come again soon.</p>
                            </div>
                        </div>
                    </Printable>
                );
            }
        }

        return null;
    }
}

export default AdminTransactionPrint;