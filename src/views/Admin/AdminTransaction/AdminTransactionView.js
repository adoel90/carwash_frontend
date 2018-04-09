import React from 'react';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';



const AdminTransaction = props => {

    return (
        <div>
            <div className="admin-user">
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Daftar Produk</h4>
                        
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <h1>Hai</h1>
                            {/* <TableSet
                                loading={storeMenuList.isFetching}
                                loaded={storeMenuList.isLoaded}
                                columns={table.columns}
                                rows={table.rows}
                                striped 
                                fullWidth
                                pagination
                            /> */}
                        </div>
                    </PanelBody>
                </Panel>
                {/* { renderMenuProductModal() } */}
            </div>
        </div>
    )
}

export default AdminTransaction;