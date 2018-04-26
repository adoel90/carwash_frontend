import React, { Component } from 'react';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import { Printable } from '../../../components/Print';
import { ListGroup, ListGroupItem } from '../../../components/List';

class AdmintTransactionPrintSecondary extends Component{

    render (){

        const { storeState, statusPrintDataConfirm, selectedMenuItem, user, storeIdTab} = this.props

        const tdThStyle = {
            'border-bottom': '3px solid #CCC',
            height: '30px'   
        }   

        const tdStyle = {
            'text-align': 'center'
        }

        const renderSummary = () => {
            
            let nameStoreStaff =  statusPrintDataConfirm === 200 ? user.name : null;

            return(
                <div className="receipt-body margin-bottom-small">
                    <table className="printReportDailyStaffStore">
                        <tr>
                            {/* <th className="fw-bold tdThStyle">Item</th> */}
                            <th className="fw-bold tdThStyle">Menu</th>
                            <th className="fw-bold tdThStyle">Total Harga </th>
                        </tr>
                        { selectedMenuItem.map((value) => {
                            return(
                                <tr>
                                    {/* <td className="fw-bold" style={tdThStyle, tdStyle}> {value.quantity}</td> */}
                                    <td className="fw-bold" style={tdThStyle, tdStyle}> {value.name}</td>
                                    <td className="fw-bold" style={tdThStyle, tdStyle}> {value.price}</td>
                                </tr>
                            )
                        }) }
                    </table>
                </div>
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
                            <p className="fw-bold">805 Carwash</p>
                            <p>Jln. Raya Pegangsaan 2 no 23-B <br/> 0896-0457-8309 <br/> 021-957-362-77</p>
                        </div>
                        <div className="align-center margin-top-base margin-bottom-base">
                            <p className="fw-bold">{storeIdTab.name}</p>
                            <p className="fw-bold">{nameStoreStaff}</p>
                        </div>
                        <div className="receipt-body margin-bottom-small">
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