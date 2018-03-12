import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel } from '../../../components/Panel';
import { ButtonDewek } from '../../../components/ButtonDewek';


const CustomerOurServiceView = props => {

    return (
        <div>
           
            <div className="admin-dashboard">
                <Section>
                    <Panel>
                        <div className="admin-dashboard__heading">  
                            <h4 className="heading-title">Layanan Kami</h4>
                            <h6 className="heading-subtitle">Non veniam do cupidatat culpa dolor consectetur fugiat dolore qui id amet ad incididunt.</h6>
                        </div>

                        <ButtonDewek>Okey !!!</ButtonDewek>
                    </Panel> 
                </Section>
            </div>
        </div>
    )
};

export default CustomerOurServiceView;