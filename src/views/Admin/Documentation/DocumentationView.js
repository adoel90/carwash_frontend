import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';

const DocumentationView = props => {
    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Documentation</h4>
                    </PanelHeader>
                    <PanelBody>
                        
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default DocumentationView;