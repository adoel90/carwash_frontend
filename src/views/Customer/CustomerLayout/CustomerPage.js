import React from 'react';
import PropTypes from 'prop-types';
import { PropsRoute } from '../../../utilities/Route';
import { Page, Header, Content } from '../../../layouts/Layout';

const CustomerPage = props => {
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
        <div>
            <h1>Hello</h1>
            <Page>
            
                {/* <Header block></Header> */}
                <Content>
                    { renderRoutes() }
                </Content>
            </Page>
        </div>
    );
};

CustomerPage.propTypes = {
    
};

export default CustomerPage;