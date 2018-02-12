import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { Container, Row, Column } from '../../../layouts/Grid';
import { PropsRoute } from '../../../utilities/Route';
import { AdminHeader, AdminSidebar, AdminContent } from '../AdminLayout';
import { AdminDashboard } from '../AdminDashboard';

const AdminPanelView = props => {
    const {
        match,
        routes,
    } = props;

    const renderRoutes = () => {
        return routes.map((route, i) => {
            return (
                <PropsRoute
                    name={route.name}
                    path={route.path}
                    component={route.component}
                    {...this.props}
                />
            )
        })
    }
    
    return (
        <div className="admin-panel">
            <div className="admin-panel__container">
                <AdminSidebar {...props} />
                <AdminContent>
                    <AdminHeader {...props} />
                    { renderRoutes() }
                </AdminContent>
            </div>
        </div>
    );
};

export default AdminPanelView;