import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Row } from '../Grid';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Button } from '../Button';

class SettingsNewService extends Component {
    constructor() {
        super();
        this.triggerFileChange = this.triggerFileChange.bind(this);
    }

	triggerFileChange = (e) => {
		const fileInput = ReactDOM.findDOMNode(this.fileInput);
		fileInput.click();
	}
    
    render() {
        const {
			isModalOpen,
			toggleModal,
			newService,
			handleInputChange,
			handleImageChange,
			handleNewServiceSubmit
        } = this.props;
        
        const renderPhotoPreview = () => {
            if(!newService.imagePreview) {
                return <i className="fi flaticon-picture icon icon--gigant clr-primary" onClick={this.triggerFileChange}></i>
            }
            else {
                return <img src={newService.imagePreview} style={{ width: '100%' }} onClick={this.triggerFileChange} />
            }
        }
        
        return (
            <Modal
            name="newService"
            isOpen={isModalOpen.newService}
            toggle={() => toggleModal('newService')}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Buat Service Baru</h6>
                </ModalHeader>
                <Form onSubmit={handleNewServiceSubmit}>
                    <ModalContent>
                        <Row>
                            <div className="column-4 flex flex-column align-items--center justify-content--center">
                                { renderPhotoPreview() }
                                <Input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    ref={(input) => this.fileInput = input }
                                    onChange={(e) => handleImageChange(newService, e)}
                                    style={{display: 'none'}}
                                    readOnly
                                />
                                <p className="fw-semibold clr-primary">Tambahkan Foto</p>
                            </div>
                            <div className="column-8">
                                <FormGroup>
                                    <Label htmlFor="name" className="fw-semibold">Nama Service</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Masukkan nama service baru"
                                        onChange={(e) => handleInputChange(newService, e)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="price" className="fw-semibold">Harga</Label>
                                    <InputGroup>
                                        <InputAddon>
                                            <small className="fw-semibold tt-uppercase ls-base">Rp</small>
                                        </InputAddon>
                                        <InputCurrency
                                            type="text"
                                            name="price"
                                            placeholder="Masukkan harga service baru"
                                            thousandSeparator={true}
                                            onChange={(e) => handleInputChange(newService, e)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        placeholder="Masukkan deskripsi service baru"
                                        onChange={(e) => handleInputChange(newService, e)}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                    </ModalContent>
                    <ModalFooter className="flex justify-content--flex-end">
                        <Button type="button" buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('newService')}>
                            <small className="tt-uppercase ls-base fw-semibold">Batal</small>
                        </Button>
                        <Button buttonTheme="primary" className="clr-light">
                            <small className="tt-uppercase ls-base fw-semibold">Buat</small>
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default SettingsNewService;