import React from 'react';
import PropTypes from 'prop-types';
import { PropsRoute } from '../../../utilities/Route';
import { Page, Header, Content } from '../../../layouts/Layout';

const AdminStoreCashierPage = props => {

    const {routes } = props;
    
    const renderRoutes = () => {
        return routes.map((route, i) => {
            return (
                <PropsRoute
                    key={route.id}
                    name={route.name}
                    path={route.path}
                    component={route.component}
                    exact
                    {...props}
                />
            )
        })
    }
    
    return (
        <Page>
            <Content>
                { renderRoutes() }
            </Content>
        </Page>
    );
};

/* Declare this only to verify our object is correct */
AdminStoreCashierPage.propTypes = {
    /* Still empty */
};

export default AdminStoreCashierPage;