import React from 'react';
import PropTypes from 'prop-types';
import { Header, HeaderBlock, HeaderNavigation } from '../../layouts/Header';

const AdminHeaderView = props => {
    const {
        routes
    } = props;
    
    return (
        <Header block>
            <HeaderBlock>
                <h5>805 CARWASH</h5>
            </HeaderBlock>
        </Header>
    );
};

AdminHeaderView.propTypes = {
    
};

export default AdminHeaderView;