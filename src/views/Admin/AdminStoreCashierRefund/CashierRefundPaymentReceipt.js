import React, { Component } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Printable } from '../../../components/Print';
import { ListGroup, ListGroupItem } from '../../../components/List';


class CashierRefundPaymentReceipt extends Component {

    

    render() {

        const { printData, statusPrintData } = this.props;
        
        let customerName = printData.item.data.card.name;
        let cardType = printData.card.type.name;
        let saldoUangInCard = printData.data.balance;

        if(statusPrintData === 200 ){

            return (
                <Printable>
                    <div className="receipt">
                        <div className="receipt-header ta-center margin-bottom-small">
                            <div className="margin-bottom-small">
                                {/* <h5 className="fw-bold">{customerName}</h5> */}
                            </div>
                            <p className="fw-bold">805 Carwash</p>
                            <p>Jln. Raya Pegangsaan 2 no 23-B <br/> 0896-0457-8309 <br/> 021-957-362-77</p>
                        </div>
                        <div className="align-center margin-top-base margin-bottom-base">
                            <h5 className="fw-bold">{customerName}</h5>
                        </div>
                        <div className="receipt-body margin-bottom-small">
                            <table style={{width: '100%'}}>
                                <tbody>
                                    <tr className="padding-bottom-small">
                                        <td>Saldo Kartu : </td>
                                        <td className="ta-right">
                                            <p>{cardType}</p>
                                        </td>
                                    </tr>

                                    <tr className="padding-bottom-small">
                                        <td>Saldo Kartu : </td>
                                        <td className="ta-right">
                                            <p>{saldoUangInCard}</p>
                                        </td>
                                    </tr>
                               
                                </tbody>
                            </table>
                        </div>

                        <div className="receipt-footer ta-center">
                            <div className="margin-bottom-small">
                                {/* <p className="fw-semibold">For Customer <br/>{printData.status === 200 ? printData.result.member.name : null}</p> */}
                            </div>
                            <p className="fw-semibold">{moment(new Date).format('LLL')}</p>
                            <p>
                                Thank you :)
                            </p>
                        </div>
                    </div>
                </Printable>
            )
        }
        return null
    }
}


export default CashierRefundPaymentReceipt;