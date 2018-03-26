import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel } from '../../../components/Panel';
import { ButtonDewek } from '../../../components/ButtonDewek';
import {PageBlock} from '../../../components/Page';
import { Form, FormGroup } from '../../../components/Form';
import { Modal } from '../../../components/Modal';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../../../components/Input';

const StoreCashierTopUpView = props => {

    const { 
        member,
        match,
        error,
        isAuthenticated,
        

        authData,
        handleInputChange,
        handleAuthentication,
        isModalOpen,

    } = props;

    const renderModal = ()=> {
        <Modal isOpen={isModalOpen.topup}>
            <h1>Hai hai hai hai </h1>
        </Modal>
    }

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <div className="admin-dashboard__heading">

                        <PageBlock>
                            <h4 className="heading-title">Isi Ulang Saldo </h4>
                            <p className="clr-passive">Silahkan gesek kartu member untuk mengisi saldo customer pada kolom berikut.</p>

                                <Form onSubmit={handleAuthentication}>
                            	{/* <Form onSubmit={handleMemberAuthenticateSubmit}> */}
                                    {/* { renderAlert() } */}
                                    <FormGroup>
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="ion-card" />
                                            </InputAddon>
                                            <Input
                                                name="cardID"
                                                type="number"
                                                placeholder="16-digit nomor kartu member"
                                                onChange={(e) => handleInputChange('authData', e)}
                                                // onClick= {() => openModal()}
                                                autoFocus="true"
                                                selectOnFocus
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </Form>
                        </PageBlock>

                        {renderModal()}
                    </div>
                </Panel> 
            </Section>
        </div>
    )
};

export default StoreCashierTopUpView;