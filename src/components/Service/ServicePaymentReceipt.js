import React, { Component } from 'react';
import moment from 'moment';
import { Printable } from '../Print';
import { ListGroup, ListGroupItem } from '../List';
import NumberFormat from 'react-number-format';
import storeState from '../../reducers/store.reducer';

class ServicePaymentReceipt extends Component {

    constructor(){
        super();
        this.state = {

        }
    }

    render() {

        const {
            service,
            printData,
            storeState,
            storeActive
        } = this.props;


        // const dataObjectMember = storeState.store.isLoaded ? printData.result : null 

        // const requireData= {

        //     idTransaction: null,
        //     dateTransaction: null,
        //     memberName: dataObjectMember.member.name,
        //     menuName: null,
        //     totalHarga: null,
        //     saldoAwal: null,
        //     saldoAkhir: null,
        // }

        // console.log(requireData);
            
        const renderItemList = () => {
            if(printData.service) {
            // if(printData.result.menu[storeActive]) {
                return (
                    <table style={{width: '100%'}} className="margin-bottom-1">
                        <tbody>
                            <tr>
                                <td>{printData.result.menu[storeActive].name}</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
				                        displayType={'text'}
                                        // value={printData.service.price} 
                                        value={printData.result.menu[storeActive].price} 
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )
            }
        }

        const renderSummary = () => {
            if(printData.result.menu[storeActive]) {
                return (
                    <table style={{width: '100%'}}>
                        <tbody>
                            <tr>
                                <td>Total Harga:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        value={printData.result.menu[storeActive].price} 
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Saldo Awal:</td>
                                <td className="ta-right">
                                    <NumberFormat
                                        thousandSeparator={true}
                                        displayType={'text'}
                                        // value={parseInt(printData.service.price) + parseInt(printData.member.balance)}
                                        value={parseInt(printData.result.menu[storeActive].price) + parseInt(printData.result.member.balance)}
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
        
        if(storeState.print.isPrinting) {
            return <p>Tunggu sebentar...</p>
        }
        
        if(storeState.print.isPrinted) {
            return (
                <Printable>
                    <div className="receipt">
                        <div className="receipt-header ta-center margin-bottom-3">
                            <div className="margin-bottom-3">
                                {/* <h5 className="fw-bold">{printData.id}</h5> */}
                                <h5 className="fw-bold">{printData.id}</h5>
                            </div>
                            <p className="fw-bold">805 Carwash</p>
                            <p>Jln. Raya Pegangsaan 2 no 23-B <br/> 0896-0457-8309 <br/> 021-957-362-77</p>
                        </div>
                        <div className="receipt-body margin-bottom-3" style={{padding: '15px'}}> 
                            
                            
                            {renderItemList()}
{/*                             
                            {renderSummary()} */}


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