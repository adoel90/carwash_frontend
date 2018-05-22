// VendorLoginView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from '../../../layouts/GridOld';
import { PageBlock } from '../../../components/Page';
// import { default as StoreIcon } from '../../../assets/icons/Business/store-2.svg';
import { default as StoreIcon } from '../../../assets/images/805carwash_white.svg';
import { Form, FormGroup } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

const CustomerLoginView = props => {
    
    const {
        member,
        match,
        error,
        isAuthenticated,
        handleInputChange,
        handleAuthentication,
        renderAlert,
        handlePreventErurOnLogin
    } = props;

    return (
            <div>
                <div className="main-content">
                    <Form onSubmit={handleAuthentication}>
                        <main className="layout-login landing" >
                            <div className="landing__container">
                                <img src={StoreIcon} style={{ width: '65%' }} />
                                <h2 style={{color : '#F8B004'}}>Selamat datang di 805 Carwash </h2>
                                {/* <h5>Silahkan gesek kartu member Anda :</h5> */}
                                
                                { renderAlert() }
                                
                                <FormGroup>
                                    <Input  
                                        style={{ 'width': '270px', 'margin-top': '10px'  }}
                                        type="password"
                                        name="cardID"
                                        placeholder="Tap di sini & Gesek Kartu Anda !"
                                        onChange={(e) => handleInputChange('authData', e)}
                                        autoFocus
                                        selectOnFocus
                                        
                                    />
                                </FormGroup>
                            </div>
                        </main>
                    </Form>
                </div>
            </div>
    );
};

export default CustomerLoginView;
