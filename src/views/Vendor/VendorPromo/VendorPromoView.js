import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { ButtonDewek } from '../../../components/ButtonDewek';

const VendorPromoView = props => {

    return (

        <div>
             <div className="admin-user">
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Promo</h4>
                        <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                        
                    </PanelHeader>
                    <PanelBody>

                        <div className="admin-dashboard__heading">
                            <h4 className="heading-title">Promo</h4>
                        </div>

                        <ButtonDewek>Okey !!!</ButtonDewek>
                    </PanelBody>
                </Panel>
    
            </div>
        </div>
    )
};

export default VendorPromoView;