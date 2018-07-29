import React from 'react';
import { DocumentationSidebar, DocumentationPage } from '../DocumentationLayout';
import { Layout } from '../../../layouts/Layout';

const DocumentationPanelView = props => {
    return (
        <Layout>
            <DocumentationSidebar {...props} />
            <DocumentationPage {...props} />
        </Layout>
    )
};

export default DocumentationPanelView;