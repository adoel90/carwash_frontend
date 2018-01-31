import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Form, FormGroup } from '../../components/Form';
import { Input, InputGroup, InputAddon, Label } from '../../components/Input';
import { Button } from '../../components/Button';

const AdminLoginView = props => {
    return (
        <main className="login-view login-view--admin-panel">
            <Card theme="primary">
                <div className="padding-bottom-3 ta-center">
                    <h5>805 Carwash Admin Panel</h5>
                    <p>Silahkan masukan kolom berikut dengan sesuai.</p>
                </div>
                <Form>
                    <FormGroup>
                        <Label className="fw-semibold">Username</Label>
                        <Input type="text" placeholder="Masukkan username" />
                    </FormGroup>
                    <FormGroup>
                        <Label className="fw-semibold">Password</Label>
                        <Input type="password" placeholder="Masukkan password" />
                    </FormGroup>
                    <Button type="submit" buttonTheme="secondary" buttonFull>
                        <small className="tt-uppercase fw-semibold ls-base">Masuk</small>
                    </Button>
                </Form>
            </Card>
        </main>
    );
};

AdminLoginView.propTypes = {
    
};

export default AdminLoginView;