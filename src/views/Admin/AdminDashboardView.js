import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Column } from '../../layouts/Grid';

const AdminDashboardView = props => {
    return (
        <main className="admin-dashboard">
            <Container>
                <p>Welcome Admin. This is the dashboard page.</p>
            </Container>
        </main>
    );
};

AdminDashboardView.propTypes = {
    
};

export default AdminDashboardView;