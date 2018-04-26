import React from 'react';
import { Table } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Input, InputCurrency } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { AdminTransactionDetail, AdminTransactionCheckout, AdminTransactionPrint, AdmintTransactionPrintSecondary } from '../AdminTransaction';
import { PageBlock } from '../../../components/Page';
import Currency from '../../../components/Currency';

const AdminTransactionView = props => {

    const buttonStyle = {
        'margin-left': '320px',
    }

    const fixedStyle = {
        'position': 'fixed',
        'left': '0px',
        'top': '0px',
        'z-index': '-100'
    }

    const { member, listMenuStore, table, handleFormSubmit, handleInputChange, selectedMenuItem, handleSelectMenu,printListMenuStore, statusPrintDataConfirm } = props;
   
    return(
        <div>
            <div className="admin-user">
                <Panel>
                    <PanelHeader>

                    {
                        //*** if owner then appear print, else don't appear
                        // props.type.owner === true ? <h4 className="heading-title">Transakasi Pemesanan  <Button  onClick={(e) => printListMenuStore(e)}  style={buttonStyle} type="submit" theme="light">Print</Button></h4> : <h4 className="heading-title">Transakasi Pemesanan</h4>
                        }
                    <h4 className="heading-title">Transakasi Pemesanan</h4>
                    </PanelHeader>
                    <PanelBody>
                        {/* <form onSubmit={handleFormSubmit}> */}
                            <div className="admin-user__content">
                                <Table fullWidth>
                                    <thead className="table__head">
                                        <tr>
                                            <th>Nama Produk</th>
                                            <th>Deskripsi Produk</th>
                                            <th>Harga</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table__body">
                                        { listMenuStore.isLoaded ? listMenuStore.data.data.result.menu.map((item, i) => {
                                            item.selected = item.selected ? true : false;
                                            item.quantity = item.quantity ? item.quantity : 1;
                                            item.totalPrice = item.quantity * item.price;
                                            return (
                                                <tr className={item.selected ? 'bg-secondary' : 'bg-white'} onClick={() => handleSelectMenu(item)} key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <Currency
                                                            value={item.price}
                                                        />
                                                    </td>
                                                  </tr>
                                            )
                                        }) : null }
                                    </tbody>
                                </Table>
                                <div class="confirmFixedButton">
                                    <Button type="submit" className="margin-top-base" disabled={!selectedMenuItem.length} onClick={handleFormSubmit} size="large" block>Konfirmasi Pembayaran {selectedMenuItem.length ? `( ${selectedMenuItem.length} Terpilih )` : null}</Button>
                                </div>
                            </div>
                        {/* </form> */}
                    </PanelBody>
                </Panel>
                
                <AdminTransactionDetail {...props} />
                <AdminTransactionCheckout {...props} />
            
                {/* Print Secondary */}
                {statusPrintDataConfirm === 200 ? <AdmintTransactionPrintSecondary {...this.state} {...props} /> : <AdminTransactionPrint {...props} />}

                {/* Print After Authenticated Member */}
                {/* {member.item.isAuthenticated === true ? <AdminTransactionPrint {...props} /> : null} */}
               
            </div>
        </div>
    )
}

export default AdminTransactionView;
