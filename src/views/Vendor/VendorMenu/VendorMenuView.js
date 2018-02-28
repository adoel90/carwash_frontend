import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel } from '../../../components/Panel';

const VendorMenuView = props => {

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <div className="admin-dashboard__heading">
                       <h1>Hallo</h1>
                        
                    </div>
                </Panel>
            </Section>
        </div>
    )
};

export default VendorMenuView;