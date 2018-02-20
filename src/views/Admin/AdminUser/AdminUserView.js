import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelStack } from '../../../components/Panel';
import { Table, TableHead, TableBody } from '../../../components/Table';
import { Button } from '../../../components/Button';

const AdminUserView = props => {
    const {
        userList
    } = props;
    
    const renderTableBody = () => {
        if(userList.isLoaded) {
            return userList.data.data.result.map((user, i) => {
                return (
                    <tr>
                        <td style={{ width: '5%', whiteSpace: 'nowrap'}}>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <Button className="margin-right-small">Ubah</Button>
                            <Button theme="secondary">Hapus</Button>
                        </td>
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
                                <th>Nama User</th>
                                <th>Alamat Email</th>
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