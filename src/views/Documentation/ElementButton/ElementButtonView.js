import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { Button } from '../../../components/Button';

const ElementButtonView = props => {
    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Button</h4>
                    </PanelHeader>
                    <PanelBody>
                         
                        <Button theme="primary">Button Primary</Button>
                        <br /><br />
                        <Button theme="secondary">Button Secondary</Button>
                        <br /><br />
                        <Button theme="success">Button Success</Button>
                        <br /><br />
                        <Button theme="warning">Button Warning</Button>
                        <br /><br />
                        <Button theme="danger">Button Danger</Button>
                        <br /><br />
                        <Button theme="light">Button Light</Button>
                        <br /><br />
                        <Button theme="dark-light">Button Dark Light</Button>
                        <br /><br />
                        <Button theme="dark">Button Dark</Button>
                    </PanelBody>
                </Panel>
            </Section>
        </div>
    )
};

export default ElementButtonView;