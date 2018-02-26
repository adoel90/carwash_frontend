import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../../../layouts/Section';
import { Form, FormField } from '../../../layouts/Form';
import { Row, Column } from '../../../layouts/Grid';
import { Input, InputGroup, Switch } from '../../../components/Input';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

const VendorUserView = props => {
    // vendorUserList
 
    const {
        isModalOpen, 
        table, 
        vendorList, 
        toggleModal, 
        handleInputChange, 
        updateVendor, 
        selectedUser } = props;

    const renderVendorDetailModal = () => {

        if(selectedUser){

            return(
                <Modal
                    isOpen={isModalOpen.updateVendor}
                    toggle={() => toggleModal('updateVendor')}>

                    <ModalHeader>
                        <h5>Ubah Informasi Vendor</h5>
                    </ModalHeader>
                

                    <Form onSubmit={updateVendor}>
                        <ModalBody>
                            <Row>
                                <Column>
                                    <FormField label="Hai">
                                        <Input name="username" placeholder={selectedUser.name} defaultValue={selectedUser.name} onChange={(e) => handleInputChange('selectedUser', e)} />
                                    </FormField>
                                </Column>
                                <Column>

                                </Column>
                            </Row>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <Button>Simpan</Button>
                        </ModalFooter>

                    </Form>
                </Modal>
            )
        }
    }

    return (
        <div className="admin-user">
            <Panel>
                <PanelHeader>
                    <h4 className="heading-title">Daftar User</h4>
                    <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
                    
                </PanelHeader>
                <PanelBody>
                    <div className="admin-user__content">
                        <TableSet
                            loading={vendorList.isFetching}
                            loaded={vendorList.isLoaded}
                            columns={table.columns}
                            rows={table.rows}
                            striped 
                            fullWidth
                            pagination
                        />
                    </div>
                </PanelBody>
            </Panel>
            { renderVendorDetailModal() }
        </div>
    );


    // return (
    //     <div className="admin-user">
    //         <Panel>
    //             <div className="admin-user__heading padding-bottom-large">
    //                 <h4 className="heading-title">Daftar User</h4>
    //                 <h6 className="heading-subtitle">Tempor nostrud cupidatat officia sit ullamco eu pariatur ullamco quis laborum nulla ipsum.</h6>
    //             </div>
    //             <div className="admin-user__content">

    //                 <TableSet
    //                     columns={table.columns}
    //                     rows={table.rows}
    //                     striped 
    //                     fullWidth
    //                     pagination
    //                 />
    //             </div>
    //         </Panel>
    //     </div>
    // );



};

VendorUserView.propTypes = {
    
};

export default VendorUserView;