import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';

const AdminUserView = props => {
    const {
        table,
        userList
    } = props;

    return (
        <div className="admin-user">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Daftar User</h4>
                    <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                </PanelHeader>
                <PanelBody>
                    <div className="admin-user__content">
                        <TableSet
                            loading={userList.isFetching}
                            loaded={userList.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                        />
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

AdminUserView.propTypes = {
    
};

export default AdminUserView;