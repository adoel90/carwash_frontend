import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../../utilities/Route';
import { AdminPage, AdminHeader, AdminContent, AdminSidebar } from '../../Admin';
import { Row, Column } from '../../../layouts/Grid';

const AdminPanelView = props => {
    const {
        routes,
    } = props;

    /** Renders routes with props inheritance. */
    const renderRoutes = () => {
        return routes.map((route, i) => {
            return <PropsRoute
                name={route.name}
                path={route.path}
                component={route.component}
                {...this.props}
            />
        })
    }

    return (
        <div className="admin-panel">
            <AdminSidebar {...props} />
            <AdminPage>
                <AdminHeader {...props} />
                <AdminContent>
                    { renderRoutes() }
                </AdminContent>
            </AdminPage>
        </div>
    )
};

export default AdminPanelView;