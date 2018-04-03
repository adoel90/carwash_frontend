import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch, InputAddon } from '../../../components/Input';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { ButtonDewek } from '../../../components/ButtonDewek';




const AdminStoresPromoView = props => {

    const { 
        promoList, 
        table, 
        selectedPromo, 
        isModalOpen, 
        toggleModal, 
        handleFormSubmit, 
        handleInputChange
        
    } = props;


    //#Modal
    const renderStoresPromoModal = () => {
        if(selectedPromo){
            
            return(
                <Modal
                    isOpen={isModalOpen.updatePromo}
                    toggle={() => toggleModal('updatePromo')}>

                    <ModalHeader>
                        <h5>Informasi Promo</h5>
                    </ModalHeader>
                    
                    <Form onSubmit={handleFormSubmit}>

                        <ModalBody>
                            <Row>
                                <Column>
                                    <FormField label="Discount Promo (Angka otomatis berubah menjadi persen)">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-percent"></i>
                                            </InputAddon>
                                            <Input  className="input" name="price" placeholder={selectedPromo.price}  defaultValue={selectedPromo.price} onChange={(e) => handleInputChange('selectedPromo', e)} />
                                        </InputGroup>
                                    </FormField>
                                    
                                    
                                    <FormField label="Tanggal berakhir-nya Discount">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-calendar-alt"></i>
                                            </InputAddon>
                                            <Input  className="input" type="date" name="date" placeholder={selectedPromo.date} defaultValue={selectedPromo.date} onChange={(e) => handleInputChange('selectedPromo', e)} />
                                        </InputGroup>
                                    </FormField>
                                </Column>
                            </Row>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <Button className="margin-right-small" theme="danger" type="button" onClick={() => toggleModal('updatePromo')}>Batal</Button>
                            <Button type="submit">Simpan</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            )
            
        }

    }
    

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                    <h4 className="heading-title">Promo Periode ini</h4>
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <TableSet
                                loading={promoList.isFetching}
                                loaded={promoList.isLoaded}
                                columns={table.columns}
                                rows={table.rows}
                                striped 
                                fullWidth
                                pagination
                            />
                        </div>
                    </PanelBody>
                </Panel> 
                { renderStoresPromoModal() }
            </Section>
        </div>
    )
};

export default AdminStoresPromoView;

