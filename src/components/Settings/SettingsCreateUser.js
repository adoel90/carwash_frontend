import React, { Component } from 'react';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, Label } from '../Input';
import { Row } from '../Grid';
import { Button } from '../Button';
import { Alert } from '../Alert';

class SettingsCreateUser extends Component {
    render() {
        const {
            isModalOpen,
            toggleModal,
            accessList,
            newUser,
            cafeTypes,
            handleCreateUserSubmit,
            handleInputChange
        } = this.props;
        
        return (
            <Modal
                isOpen={isModalOpen.createUser}
                toggle={() => toggleModal('createUser')}
                className="modal-dialog--large">
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Tambah User Baru</h6>
                </ModalHeader>
                <Form onSubmit={handleCreateUserSubmit}>
                    <ModalContent>
                        {
                            newUser.error
                            ? <Alert theme="danger" className="flex clr-light margin-bottom-2">
                                <i className="ion-alert-circled margin-right-2"></i>
                                <p>{newUser.error.message}</p>
                            </Alert>
                            : null
                        }
                        <Row>
                            <div className="column-6">
                                <FormGroup>
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
                                <FormGroup>
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
                                <FormGroup>
                                    <Label className="fw-semibold">Kata Sandi</Label>
                                    <InputGroup>
                                        <InputAddon>
                                            <i className="ion-locked"></i>
                                        </InputAddon>
                                        <Input
                                            name="password"
                                            type="password"
                                            placeholder="Masukkan kata sandi"
                                            onChange={(e) => handleInputChange(newUser, e)}
                                            required="true"
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="fw-semibold">Ulangi Kata Sandi</Label>
                                    <InputGroup>
                                        <InputAddon>
                                            <i className="ion-locked"></i>
                                        </InputAddon>
                                        <Input
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Masukkan ulang kata sandi"
                                            onChange={(e) => handleInputChange(newUser, e)}
                                            required="true"
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </div>
                            <div className="column-6">
                                <FormGroup>
                                    <Label className="fw-semibold">Alamat Email</Label>
                                    <InputGroup>
                                        <InputAddon>
                                            <i className="ion-email"></i>
                                        </InputAddon>
                                        <Input
                                            name="email"
                                            type="text"
                                            placeholder="Masukkan alamat email"
                                            onChange={(e) => handleInputChange(newUser, e)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="fw-semibold">Akses Level</Label>
                                    <Input
                                        name="level"
                                        type="select"
                                        onChange={(e) => handleInputChange(newUser, e)}
                                        value={newUser.level}>
                                        <option disabled="true">Pilih akses level</option>
                                        { 
                                            accessList.isLoaded ? accessList.data.map((item) => {
                                                return <option value={item.id}>{item.name}</option>
                                            })
                                            : null
                                        }
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label className="fw-semibold">Akses Cafe</Label>
                                    <Input
                                        name="cafe"
                                        type="select"
                                        onChange={(e) => handleInputChange(newUser, e)}
                                        value={newUser.cafe}>
                                        <option value={0}>Semua</option>
                                        { 
                                            cafeTypes.isLoaded ? cafeTypes.data.map((item) => {
                                                return <option value={item.id}>{item.name}</option>
                                            }) 
                                            : null
                                        }

                                    </Input>
                                </FormGroup>
                            </div>
                        </Row>
                    </ModalContent>
                    <ModalFooter className="flex justify-content--flex-end">
                        <Button type="button" buttonTheme="danger" className="clr-light" onClick={() => toggleModal('createUser')}>
                            <small className="fw-semibold tt-uppercase ls-base">Batal</small>
                        </Button>
                        <Button buttonTheme="primary" className="clr-light margin-left-2">
                            <small className="fw-semibold tt-uppercase ls-base">Tambah</small>
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default SettingsCreateUser;