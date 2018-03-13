import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel } from '../../../components/Panel';
import { ButtonDewek } from '../../../components/ButtonDewek';
import { Profile } from '../../../components/Profile';

// import MainHeader from '../../../components/MainHeader';

const CustomerMyProfileView = props => {
    return (
        <div>                 
                <Section>
                    <Panel>
                        <div className="admin-dashboard__heading">  
                            <h4 className="heading-title">Profile GW</h4>
                            <h6 className="heading-subtitle">Non veniam do cupidatat culpa dolor consectetur fugiat dolore qui id amet ad incididunt.</h6>
                        </div>

                        <br />
                        <br />
                        <br />

                        <Profile
                            {...props}
                            // toggleDialog={this.toggleDialog}
                            // showDialog={this.showDialog}
                            // hideDialog={this.hideDialog}
                        /> 
                    
                    </Panel> 
                </Section>
                {/* <MainHeader {...this.state} {...this.props} /> */}

          
        </div>
    )
};

export default CustomerMyProfileView;