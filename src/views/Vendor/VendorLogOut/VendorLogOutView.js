import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormField } from '../../../layouts/Form';
import { Button } from '../../../components/Button';

const VendorLogOutView = props => {


    const { onLogOutSubmit, credentials } = props;


    return(

        <Form onSubmit={onLogOutSubmit}>
            <FormField>
                <h3>Click this button to Log-out</h3>
            </FormField>
            <Button type="submit">Log-out</Button>

        </Form>
    )
}

export default VendorLogOutView;