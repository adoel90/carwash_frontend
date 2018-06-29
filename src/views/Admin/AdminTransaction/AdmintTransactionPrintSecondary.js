import React, { Component } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Printable } from '../../../components/Print';
import { ListGroup, ListGroupItem } from '../../../components/List';

class AdmintTransactionPrintSecondary extends Component{

    render (){

        const { 
            storeState, 
            statusPrintDataConfirm, 
            selectedMenuItem, 
            user, 
            dataTransaction,
            storeIdTab, 
            grandTotal} = this.props

        const tdThStyle = {
            'border-bottom': '3px solid #CCC',
            height: '30px'   
        }   

        const tdStyle = { 'text-align': 'center' }

        const renderItem = (item, i) => {
            let totalPrice = parseFloat(item.totalPrice)+((parseFloat(item.totalPrice)*parseFloat(dataTransaction.markup))/100);

            return (
                <tr>
                    <td className="padding-right-small">{item.quantity}</td>
                    <td className="padding-right-small">{item.name}</td>
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

            if(statusPrintDataConfirm === 200) {
                return (
                    <table className="margin-bottom-small" style={{width: '100%'}}>
                        <tbody>
                            {selectedMenuItem.map(renderItem)}
                        </tbody>
                    </table>
                )
            }
        }

        const renderSummary = () => {
            return (
                <table style={{width: '100%'}}>
                    <tbody>
                        <tr className="padding-bottom-small">
                            {/* <td>{dataDiscount != 0 ? "Diskon :" : null}</td> */}
                            <td className="ta-right">
                                {/* <p>{dataDiscount != 0 ? dataDiscount + "%" : null}</p> */}
                            </td>
                        </tr>
                        <tr className="padding-bottom-small">
                            <td>Total Harga:</td>
                            <td className="ta-right">
                                <NumberFormat
                                    thousandSeparator={true}
                                    displayType={'text'}
                                    value={grandTotal} 
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }

        if(statusPrintDataConfirm === 200){            
            let nameStoreStaff =  statusPrintDataConfirm === 200 ? user.name : null;

            return (
                <Printable>
                    <div className="receipt">
                        <div className="receipt-header ta-center margin-bottom-small">
                            <div className="margin-bottom-small">
                                {/* <h5 className="fw-bold">{queueInvoice}</h5> */}
                            </div>
                            <p className="fw-bold">805 Carwash HAI HAI</p>
                            <p>Jln. Raya Pegangsaan 2 no 23-B <br/> 0896-0457-8309 <br/> 021-957-362-77</p>
                        </div>
                        <div className="align-center margin-top-base margin-bottom-base">
                            <p className="fw-bold">{storeIdTab.name}</p>
                            <p className="fw-bold">{nameStoreStaff}</p>
                        </div>
                        <div className="receipt-body margin-bottom-small">
                            {renderItemList()}
                            {renderSummary()}
                        </div>
                        <div className="receipt-footer ta-center">
                            <div className="margin-bottom-small"><br />
                                {/* <p className="fw-semibold">For Customer <br/>{printData.status === 200 ? printData.result.name : null}</p> */}
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

export default AdmintTransactionPrintSecondary;