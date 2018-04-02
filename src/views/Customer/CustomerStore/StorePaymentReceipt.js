import React, { Component } from 'react';
import moment from 'moment';
import { Printable } from '../../../components/Print';
import { ListGroup, ListGroupItem } from '../../../components/List';
import NumberFormat from 'react-number-format';

class StorePaymentReceipt extends Component {
    render() {
        const {
            store,
            printData,
            selectedMenuList,
            grandTotal
        } = this.props;
        
        const renderItem = (item, i) => {
            return (
                <tr>
                    <td className="padding-right-small">{item.quantity}</td>
                    <td className="padding-right-small">{item.name}</td>
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
            if(printData.status === 200) {
                return (
                    <table className="margin-bottom-small" style={{width: '100%'}}>
                        <tbody>
                            {selectedMenuList.map(renderItem)}
                        </tbody>
                    </table>
                )
            }
        }

        const renderSummary = () => {
            if(printData.status === 200) {

                let discountLenght = store.discount.isLoaded ? store.discount.data.data.result.promo.length : null;

                let discount = discountLenght > 0 ? store.discount.data.data.result.promo[0].price : 0;
        
                return (
                    <table style={{width: '100%'}}>
                        <tbody>
                            <tr>
                                <td>Diskon:</td>
                                <td className="ta-right">
                                    <p>{discount}%</p>
                                </td>
                            </tr>
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
                                        value={parseInt(grandTotal) + parseInt(printData.result.member.balance)}
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
            let queue = printData.status === 200 ? printData.result.queue : null;
            let date = printData.status === 200 ? printData.result.date : null;
            
            return (
                <Printable>
                    <div className="receipt">
                        <div className="receipt-header ta-center margin-bottom-small">
                            <div className="margin-bottom-small">
                                <h5 className="fw-bold">{queue}</h5>
                            </div>
                            <p className="fw-bold">805 Carwash</p>
                            <p>Jln. Raya Pegangsaan 2 no 23-B <br/> 0896-0457-8309 <br/> 021-957-362-77</p>
                        </div>
                        <div className="receipt-body margin-bottom-small">
                            {renderItemList()}
                            {renderSummary()}
                        </div>
                        <div className="receipt-footer ta-center">
                            <div className="margin-bottom-small">
                                <p className="fw-semibold">For Customer <br/>{printData.status === 200 ? printData.result.member.name : null}</p>
                            </div>
                            <p className="fw-semibold">{moment(date).format('LLL')}</p>
                            <p>Thank you and please come again soon.</p>
                        </div>
                    </div>
                </Printable>
            );
        }

        return null;
    }
}

export default StorePaymentReceipt;