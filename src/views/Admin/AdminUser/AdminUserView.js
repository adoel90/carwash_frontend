import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelStack } from '../../../components/Panel';
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
                <div className="admin-user__heading padding-bottom-large">
                    <h4 className="heading-title">Daftar User</h4>
                    <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                </div>
                <div className="admin-user__content">
                    <TableSet
                        columns={table.columns}
                        rows={table.rows}
                        striped 
                        fullWidth
                        pagination
                    />
                </div>
            </Panel>
        </div>
    );
};

AdminUserView.propTypes = {
    
};

export default AdminUserView;