import React from 'react';
import PropTypes from 'prop-types';

import { Row, Column } from '../../layouts/Grid';
import { Form, FormField, FormLabel, FormControl } from '../../layouts/Form';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { default as AdminPanelBanner } from '../../assets/images/admin-panel-bg.jpg';

const AdminLoginView = props => {
    const {
        credentials,
        handleInputChange,
        onLoginSubmit
    } = props;

    console.log(credentials);

    return (
        <main className="admin-panel">
            <Row gutterless className="admin-panel__container">
                <Column md={3} sm={12} className="admin-panel__banner" style={{backgroundImage: `url(${AdminPanelBanner})`}} />
                <Column md={9} sm={12}>
                    <div className="admin-panel__content">
                        <div className="admin-panel__heading">
                            <h5 className="heading-title">805 Carwash Admin Panel</h5>
                            <h6 className="heading-subtitle">Silahkan masukkan username dan password Anda untuk masuk.</h6>
                        </div>

                        {/** Login Form */}
                        <Form onSubmit={onLoginSubmit}>
                            <FormField>
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <FormControl>
                                    <Input 
                                        name="username"
                                        type="text" 
                                        placeholder="Masukkan nama pengguna"
                                        onChange={(e) => handleInputChange(credentials, e)}
                                    />
                                </FormControl>
                            </FormField>
                            <FormField>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input 
                                    name="password"
                                    type="password"
                                    placeholder="Masukkan kata sandi"
                                    onChange={(e) => handleInputChange(credentials, e)}
                                />
                            </FormField>
                            <Button type="submit" disabled={!credentials.username || !credentials.password}>
                                Masuk
                            </Button>
                        </Form>
                    </div>
                </Column>
            </Row>
        </main>
    );
};

AdminLoginView.propTypes = {
    
};

export default AdminLoginView;