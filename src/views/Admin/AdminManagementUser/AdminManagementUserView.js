import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelStack } from '../../../components/Panel';
import { Table, TableHead, TableBody } from '../../../components/Table';

const AdminManagementUserView = props => {
    return (
        <div className="admin-user">
            <Panel>
                <div className="admin-user__heading">
                    <h4 className="heading-title">Daftar User</h4>
                    <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                </div>
                <Table>
                    <TableHead>
                        <tr>
                            <th>Nomor Kartu</th>
                            <th>Nama Member</th>
                            <th>Status</th>
                        </tr>
                    </TableHead>
                    <TableBody>
                        <tr>
                            <td>081298920156</td>
                            <td>David Kurnia Kristiadi</td>
                            <td></td>
                        </tr>
                    </TableBody>
                </Table>
            </Panel>
        </div>
    );
};

AdminManagementUserView.propTypes = {
    
};

export default AdminManagementUserView;