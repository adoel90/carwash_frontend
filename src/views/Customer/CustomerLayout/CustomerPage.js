import React from 'react';
import PropTypes from 'prop-types';
import { PropsRoute } from '../../../utilities/Route';
// import { Page, Header, Content } from '../../../layouts/Layout';
import { PageCustomer, ContentCustomer } from '../../../layouts/LayoutCustomer';

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
            {/* <h1>Hello</h1> */}
            <PageCustomer>
                {/* <Header block></Header> */}
                <ContentCustomer>
                    { renderRoutes() }
                </ContentCustomer>
            </PageCustomer>
        </div>
    );
};

CustomerPage.propTypes = {
    
};

export default CustomerPage;