import React from 'react';
import PropTypes from 'prop-types';
import { Row, Column } from '../../../layouts/Grid';
import { Form, FormField, FormLabel, FormControl } from '../../../layouts/Form';
import { Card } from '../../../components/Card';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { default as AdminPanelBanner } from '../../../assets/images/admin-panel-bg.jpg';
import { Alert } from '../../../components/Alert';

const AdminLoginView = props => {
    const {
        credentials,
        handleInputChange,
        onLoginSubmit, 
        authentication
    } = props;

    const renderAlert = () => {
        if(authentication.isError) {
            let msgError = authentication.error ? authentication.error : null;
            let errorMessage = msgError.response !== undefined ? msgError.response.data.message : 'Maaf, anda tidak punya izin untuk akses halaman tersebut';
            
            return (
                <Alert theme="warning" className="ta-center margin-bottom-2 clr-danger">
                    <p>{errorMessage}</p>
                </Alert>
            )
        }
    }
    
    return (
        <main className="admin-login">
            <Row gutterless className="admin-login__container">
                <Column md={4} sm={12} className="admin-login__banner" style={{backgroundImage: `url(${AdminPanelBanner})`}} />
                <Column md={8} sm={12}>
                    <div className="admin-login__content">
                        <div className="admin-login__heading">
                            <h4 className="heading-title">805 Carwash Admin Panel</h4>
                            <h6 className="heading-subtitle">Silahkan masukkan username dan password Anda untuk masuk.</h6>
                        </div>
                        <Form onSubmit={onLoginSubmit}>
                            { renderAlert() }
                            <FormField>
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <FormControl>
                                    <Input 
                                        name="username"
                                        type="text" 
                                        placeholder="Masukkan nama pengguna"
                                        onChange={(e) => handleInputChange('credentials', e)}
                                    />
                                </FormControl>
                            </FormField>
                            <FormField>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input 
                                    name="password"
                                    type="password"
                                    placeholder="Masukkan kata sandi"
                                    onChange={(e) => handleInputChange('credentials', e)}
                                />
                            </FormField>
                            <Button 
                                type="submit" 
                                disabled={!credentials.username || !credentials.password}
                                block>
                                Masuk
                            </Button>
                        </Form>
                    </div>
                </Column>
            </Row>
        </main>
    );
};

export default AdminLoginView;