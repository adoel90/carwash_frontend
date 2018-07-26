import React from 'react';
import PropTypes from 'prop-types';
import { PropsRoute } from '../../../components/Route';
import { Page, Header, Content } from '../../../layouts/Layout';

const DocumentationPage = props => {
    const { routes } = props;
    
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
            {/* <Header block></Header> */}
            <Content>
                { renderRoutes() }
            </Content>
        </Page>
    );
};

DocumentationPage.propTypes = {
    
};

export default DocumentationPage;