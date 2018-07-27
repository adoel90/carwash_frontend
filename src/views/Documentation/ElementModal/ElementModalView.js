import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
// import Column from '../../../layouts/Grid/Column';
import { Row, Column } from '../../../layouts/Grid';
import {Button} from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

const ElementModalView = props => {

    const { handleClickShowModal, isModalOpen, show, toggleModal, handleClickCancelModal } = props;

    const renderModalComponent = () => {

        return (
            <Modal
                isOpen={isModalOpen.show}
                toggle={() => toggleModal('show')}>
                <ModalHeader>
                    <h5>Informasi :</h5>
                </ModalHeader>
                <ModalBody>
                    <h1 className=" fw-semibold ls-base">Hai !</h1>
                </ModalBody>
                <ModalFooter className="flex justify-content--flex-end" >
                    <Button type="button" theme="danger" onClick={(e) => handleClickCancelModal(e)}>OK Mengerti</Button>
                </ModalFooter>
            </Modal>
        );
  
    };



    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Modal Pop Up </h4>
                    </PanelHeader>
                    <PanelBody>
                        <Row>
                            <Column>
                                <Button  theme="primary" type="button" onClick={(e) => handleClickShowModal(e)}>Modal</Button>
                            </Column>
                        </Row>
                        
                    </PanelBody>
                </Panel>

                {/* METHOD-01 TO RENDER MODAL */}
                {renderModalComponent()}


                {/* 
                    Sebenar-nya untuk memunculkan Modal Pop Up ini ada beberapa cara, jadi inti-nya dalam React itu flexible.
                    If we can play with 'state', you win!

                    */}




            </Section>
        </div>
    )
};

export default ElementModalView;