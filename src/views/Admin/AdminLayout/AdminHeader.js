import React from 'react';
import PropTypes from 'prop-types';
import { Header, HeaderBlock } from '../../../layouts/Header';

const AdminHeader = props => {
    return (
        <Header className="admin-panel__header" block>
            <HeaderBlock>
                <h6>805 Carwash</h6>
            </HeaderBlock>
        </Header>
    );
};

AdminHeader.propTypes = {
    
};

export default AdminHeader;