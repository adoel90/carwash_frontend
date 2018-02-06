import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Modal } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Row } from '../Grid';
import { Button } from '../Button';

class SettingsNewCafeMenu extends Component {
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
			handleCafeMenuCreateSubmit,
			handleImageChange,
			cafeMenuCreate,
			handleInputChange,
			selectedCafeMenu
        } = this.props;
    
        const renderPhotoPreview = () => {
            const {
                cafeMenuCreate
            } = this.props;
    
            if(!cafeMenuCreate.imagePreview) {
                return <i className="fi flaticon-picture icon icon--gigant clr-primary" onClick={this.triggerFileChange}></i>
            }
            else {
                return <img src={cafeMenuCreate.imagePreview} style={{ width: '100%', marginBottom: '30px' }} onClick={this.triggerFileChange} />
            }
        }
        
        return (
            <Modal
                isOpen={isModalOpen.cafeMenuCreate}
                toggle={() => toggleModal('cafeMenuCreate')}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Buat Menu Cafe Baru</h6>
                </ModalHeader>
                <Form onSubmit={handleCafeMenuCreateSubmit}>
                    <ModalContent>
                        <Row>
                            <div className="column-4 flex flex-column align-items--center justify-content--center">
                                {renderPhotoPreview()}
                                <Input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    ref={(input) => this.fileInput = input }
                                    onChange={(e) => handleImageChange(cafeMenuCreate, e)}
                                    style={{display: 'none'}}
                                    readOnly
                                />
                                <p className="fw-semibold clr-primary">{cafeMenuCreate.imagePreview ? 'Ubah Foto' : 'Tambah Foto' }</p>
                            </div>
                            <div className="column-8">
                                <FormGroup>
                                    <Label htmlFor="name" className="fw-semibold">Nama Menu</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Masukkan nama menu baru"
                                        onChange={(e) => handleInputChange(cafeMenuCreate, e)}
                                        required="true"
                                        autoFocus
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="name" className="fw-semibold">Harga Menu</Label>
                                    <InputGroup>
                                        <InputAddon>
                                            <small className="tt-uppercase fw-semibold ls-base">Rp</small>
                                        </InputAddon>
                                        <InputCurrency
                                            type="text"
                                            name="price"
                                            thousandSeparator={true}
                                            placeholder="Masukkan harga menu baru"
                                            onChange={(e) => handleInputChange(cafeMenuCreate, e)}
                                            required="true"
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="description" className="fw-semibold">Deskripsi</Label>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        placeholder="Masukkan deskripsi menu baru"
                                        onChange={(e) => handleInputChange(cafeMenuCreate, e)}
                                        required="true"
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                    </ModalContent>
                    <ModalFooter className="flex justify-content--flex-end">
                        <Button buttonTheme="danger" className="clr-light margin-right-2" onClick={() => toggleModal('cafeMenuCreate')}>
                            <small className="fw-semibold tt-uppercase ls-base">Batal</small>
                        </Button>
                        <Button buttonTheme="primary" className="clr-light">
                            <small className="fw-semibold tt-uppercase ls-base">Buat</small>
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

export default SettingsNewCafeMenu;