import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelStack } from '../../../components/Panel';
import { Table, TableHead, TableBody } from '../../../components/Table';

const AdminUserView = props => {
    const {
        userList
    } = props;
    
    const renderTableBody = () => {
        if(userList.isLoaded) {
            return userList.data.data.result.map((user, i) => {
                return (
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                    </tr>
                )
            })            
        }
    }
    
    return (
        <div className="admin-user">
            <Panel>
                <div className="admin-user__heading padding-bottom-large">
                    <h4 className="heading-title">Daftar User</h4>
                    <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                </div>
                <div className="admin-user__content">
                    <Table striped fullWidth>
                        <TableHead>
                            <tr>
                                <th>ID</th>
                                <th>Nama Member</th>
                                <th>Aksi</th>
                            </tr>
                        </TableHead>
                        <TableBody>
                            { renderTableBody() }
                        </TableBody>
                    </Table>
                </div>
            </Panel>
        </div>
    );
};

AdminUserView.propTypes = {
    
};

export default AdminUserView;