import React, { Component } from 'react';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';

class SettingsCreateUser extends Component {
    render() {
        const {
            isModalOpen,
            toggleModal,
            accessList,
            newUser,
            handleCreateUserSubmit,
            handleInputChange
        } = this.props;
        
        return (
            <Modal
                isOpen={isModalOpen.createUser}
                toggle={() => toggleModal('createUser')}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Tambah User Baru</h6>
                </ModalHeader>
                <Form onSubmit={handleCreateUserSubmit}>
                    <ModalContent>
                        <FormGroup row>
                            <Label className="fw-semibold">Nama</Label>
                            <InputGroup>
                                <InputAddon>
                                    <i className="ion-person"></i>
                                </InputAddon>
                                <Input
                                    name="name"
                                    type="text"
                                    placeholder="e.g: John Doe, Bill Appleseed, dll."
                                    onChange={(e) => handleInputChange(newUser, e)}
                                    required="true"
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <Label className="fw-semibold">Username</Label>
                            <InputGroup>
                                <InputAddon>
                                    <i className="ion-person"></i>
                                </InputAddon>
                                <Input
                                    name="username"
                                    type="text"
                                    placeholder="Masukkan username user"
                                    onChange={(e) => handleInputChange(newUser, e)}
                                    required="true"
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <Label className="fw-semibold">Kata Sandi</Label>
                            <InputGroup>
                                <InputAddon>
                                    <i className="ion-person"></i>
                                </InputAddon>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Masukkan kata sandi user"
                                    onChange={(e) => handleInputChange(newUser, e)}
                                    required="true"
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <Label className="fw-semibold">Alamat Email</Label>
                            <InputGroup>
                                <InputAddon>
                                    <i className="ion-person"></i>
                                </InputAddon>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Masukkan alamat email"
                                    onChange={(e) => handleInputChange(newUser, e)}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup row>
                            <Label className="fw-semibold">Akses Level</Label>
                            <Input
                                name="password"
                                type="select"
                                placeholder="Masukkan alamat email"
                                onChange={(e) => handleInputChange(newUser, e)}>
                                { accessList.isLoaded ? accessList.data.map((item) => {
                                    return <option>{item.name}</option>
                                })
                                : null}
                            </Input>
                        </FormGroup>
                    </ModalContent>
                    <ModalFooter>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default SettingsCreateUser;