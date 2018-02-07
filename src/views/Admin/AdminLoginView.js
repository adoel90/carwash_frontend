import React from 'react';
import PropTypes from 'prop-types';

import { Row, Column } from '../../layouts/Grid';
import { Form, FormField, FormLabel, FormControl } from '../../layouts/Form';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const AdminLoginView = props => {
    return (
        <main className="admin-panel">
            <Row gutterless className="admin-panel__container">
                <Column md={3}>
                    <p>LOL</p>
                </Column>
                <Column md={9}>
                    <div className="admin-panel__content">
                        <div className="admin-panel__heading">
                            <h5 className="heading-title">805 Carwash Admin Panel</h5>
                            <h6 className="heading-subtitle">Silahkan masukkan username dan password Anda untuk masuk.</h6>
                        </div>
                        <Form>
                            <FormField>
                                <FormLabel htmlFor="username">Username</FormLabel>
                                <FormControl>
                                    <Input 
                                        name="username"
                                        type="text" 
                                        placeholder="Masukkan nama pengguna" />
                                </FormControl>
                            </FormField>
                            <FormField>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input 
                                    type="password"
                                    placeholder="Masukkan kata sandi" />
                            </FormField>
                        </Form>
                    </div>
                </Column>
            </Row>
        </main>
    );

    // return (
    //     <Form>
    //         <FormField
    //             label="Username">
    //             <Input type="text" placeholder="Masukkan username" />
    //         </FormField>
    //         <FormField
    //             label="Password">
    //             <Input type="password" placeholder="Masukkan password" />
    //         </FormField>
    //         <Button type="submit" buttonTheme="secondary" buttonFull>
    //             <small className="tt-uppercase fw-semibold ls-base">Masuk</small>
    //         </Button>
    //     </Form>
    // );
};

AdminLoginView.propTypes = {
    
};

export default AdminLoginView;