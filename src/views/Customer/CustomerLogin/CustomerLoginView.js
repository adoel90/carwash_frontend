// VendorLoginView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from '../../../layouts/GridOld';
import { PageBlock } from '../../../components/Page';
// import { default as StoreIcon } from '../assets/icons/Business/store-2.svg';
import { default as StoreIcon } from '../../../assets/icons/Business/store-2.svg';
import { Form, FormGroup } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert';

import { ButtonDewek } from '../../../components/ButtonDewek';

const CustomerLoginView = props => {
    
    const fw_bold_new = { color: 'black'};
    const fw_semi_bold_new = { color: 'grey'};
    const background = { 'background-color': '#268dbc'}

    const {
        // member,
        // match,
        // error,
        // isAuthenticated,
        handleInputChange,
        handleAuthentication
    } = props;


    
    return (

        
        <div><br/><br/><br/><br/>
            <Form onSubmit={handleAuthentication}>
                <main className="main landing" >
                    <div className="landing__container">
                        <img src={StoreIcon} style={{ width: '150px' }} />
                        {/* <h3 className="fw-bold" >Selamat datang di Carwash 805</h3> */}
                        <h3 style={fw_bold_new} >Selamat datang di Carwash 805</h3>
                        <h5 style={fw_semi_bold_new}>Silahkan gesek kartu member Anda :</h5>
                        {/* {renderAlert()} */}
                        <FormGroup>
                            <Input
                                placeholder="Nomor ID Card"
                                type="number"
                                name="cardID"
                                onChange={(e) => handleInputChange('authData', e)}
                                autoFocus
                                selectOnFocus
                            />
                        </FormGroup>
                    </div>
                </main>
            </Form>
        </div>
    );
};

export default CustomerLoginView;
