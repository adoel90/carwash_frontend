// VendorLoginView.js
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from '../../../layouts/GridOld';
import { PageBlock } from '../../../components/Page';
import { default as StoreIcon } from '../../../assets/icons/Business/store-2.svg';
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

    const transparent = {
        'opacity': '0.9'
    };

    return (
            // <div onClick={handlePreventErurOnLogin}>
            // <div onClick={document.getElementsByName('cardID').focus()}>
            <div>
                <div className="main-content">
                    <Form onSubmit={handleAuthentication}>
                        <main className="layout-login landing" >
                            <div className="landing__container">
                                <img src={StoreIcon} style={{ width: '150px' }} />
                                <h2>Selamat datang di Carwash 805</h2>
                                <h5>Silahkan gesek kartu member Anda :</h5>
                                
                                { renderAlert() }
                                
                                <FormGroup className="margin-top-small">
                                    <Input  
                                        type="password"
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
            </div>
    );
};

export default CustomerLoginView;
