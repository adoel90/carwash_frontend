import React from 'react';
import PropTypes from 'prop-types';
import { PropsRoute } from '../../../utilities/Route';
import { Page, Header, Content } from '../../../layouts/Layout';

const AdminPage = props => {
    const {
        routes
    } = props;
    
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
            <Header block></Header>
            <Content>
                { renderRoutes() }
            </Content>
        </Page>
    );
};

AdminPage.propTypes = {
    
};

export default AdminPage;