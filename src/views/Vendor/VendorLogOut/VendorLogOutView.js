import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormField } from '../../../layouts/Form';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { ButtonDewek } from '../../../components/ButtonDewek';

const VendorLogOutView = props => {

    const { onLogOutSubmit, credentials } = props;

    return(

        <div>
             <div className="admin-user">
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Pengaturan</h4>
                        {/* <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6> */}
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                           
                            <Form onSubmit={onLogOutSubmit}>
                                <FormField>
                                    {/* <h3>Click this button to Log-out</h3> */}
                                </FormField>
                                <ButtonDewek variant="raised" color="default" type="submit">Log-out</ButtonDewek>

                            </Form>
                        </div>

                        {/* <h1>Hai</h1> */}
                    </PanelBody>
                </Panel>
            </div>
        </div>
    )
}

export default VendorLogOutView;