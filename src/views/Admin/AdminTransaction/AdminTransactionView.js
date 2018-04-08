import React from 'react';

import { Button } from '../../../components/Button';
import { TableSet } from '../../../components/Table';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';

const AdminTransactionView = props => {

    const { listMenuStore, table, handleFormSubmitCheckbox} = props;


    return(
        <div>
            <div className="admin-user">
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Transakasi Pemesanan</h4>
                        
                    </PanelHeader>
                    <PanelBody>
                        <form onSubmit={handleFormSubmitCheckbox}>
                            
                            <div className="admin-user__content">
                                <TableSet
                                    loading={listMenuStore.isFetching}
                                    loaded={listMenuStore.isLoaded}
                                    columns={table.columns}
                                    rows={table.rows}
                                    striped 
                                    fullWidth
                                    pagination
                                />
                            </div>

                            <Button type="submit">Buat Transaksi</Button>
                        </form>
                    </PanelBody>
                </Panel>
                {/* { renderMenuProductModal() } */}
            </div>
        </div>
    )
}

export default AdminTransactionView;
