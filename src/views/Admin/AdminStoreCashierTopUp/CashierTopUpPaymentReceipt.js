import React, { Component } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Printable } from '../../../components/Print';
import { ListGroup, ListGroupItem } from '../../../components/List';



class CashierTopUpPaymentReceipt extends Component{

    render (){

        const { storeState, printData } = this.props

        const renderSummary = () => {

            let nominalTopUp = printData.status === 200 ? printData.result.topup : null;
            let saldoAwalAnda = printData.status === 200 ? printData.result.before : null;
            let saldoAkhir = printData.status === 200 ? printData.result.balance : null;

            if(printData.status === 200){
                
                return (
                    <table style={{width: '100%'}}>
                        <tbody>
                            <tr className="padding-bottom-small">
                                <td>Nominal Top Up :</td>
                                <td className="ta-right">
                                    <p>{nominalTopUp}</p>
                                </td>
                            </tr>
                            <tr className="padding-bottom-small">
                                <td>Saldo Awal Anda :</td>
                                <td className="ta-right">
                                    <p>{saldoAwalAnda}</p>
                                </td>
                            </tr>

                            <tr className="padding-bottom-small">
                                <td>Saldo Akhir :</td>
                                <td className="ta-right">
                                    <p>{saldoAkhir}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
        }

    

        if(storeState.printMember.isPrinted){
            const { printData, user } = this.props;

            // console.log(printData);

            let queueInvoice = printData.status === 200 ? printData.result.queue : null;
            // let date = printData.status === 200 ? printData.result.date : null;
            let nameCustomer = printData.status === 200 ? printData.result.name : null;
            let nameStoreStaff =  printData.status === 200 ? user.level.name : null;

            return (
                <Printable>
                    <div className="receipt">
                        <div className="receipt-header ta-center margin-bottom-small">
                            <div className="margin-bottom-small">
                                <h5 className="fw-bold">{queueInvoice}</h5>
                            </div>
                            <p className="fw-bold">805 Carwash</p>
                            <p>Jln. Raya Pegangsaan 2 no 23-B <br/> 0896-0457-8309 <br/> 021-957-362-77</p>
                        </div>
                        <div className="align-center margin-top-base margin-bottom-base">
                            <p className="fw-bold">{nameStoreStaff}</p>
                        </div>
                        <div className="receipt-body margin-bottom-small">
                            {renderSummary()}
                        </div>
                        <div className="receipt-footer ta-center">
                            <div className="margin-bottom-small"><br />
                                <p className="fw-semibold">For Customer <br/>{printData.status === 200 ? printData.result.name : null}</p>
                            </div>
                            <p className="fw-semibold">{moment(new Date).format('LLL')}</p>
                            <p>
                                {/* Thank you and please come again soon. */}
                            </p>
                        </div>
                    </div>
                </Printable>
            )
        }

        return null;
    }
}

export default CashierTopUpPaymentReceipt;