import React from 'react';
import PropTypes from 'prop-types';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import { Section } from '../../../layouts/Section';
import { Panel, PanelHeader, PanelBody } from '../../../components/Panel';
import { TableSet } from '../../../components/Table';
import { Table } from '../../../components/Table';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Form, FormGroup } from '../../../components/Form';
import { Input, Label, InputAddon, InputGroup } from '../../../components/Input';

import {Button} from '../../../components/Button';

const AdminStoreCashierStockKartuView = props => {

    const { 
        card,
        openModalGenerateNumber,
        toggleModal,
        isModalOpen,
        modalGenerateNumber,
        idTaxiOnline,
        idNonMember,
        idMember,
        dataCard,
        handleCopyDataCard,
        closeModal
    } = props;

    const renderDetailModal = () => {
        
        return (
            <Modal
                isOpen={isModalOpen.modalGenerateNumber}
                toggle={() => toggleModal('modalGenerateNumber')}>
            
                <ModalHeader>
                    Tulis Kartu Baru
                </ModalHeader>
                <ModalBody>
                            <FormGroup>
                                <InputGroup>
                                    
                                    <InputAddon>
                                    <CopyToClipboard onCopy={handleCopyDataCard} text={dataCard}>
                                        <i 
                                            className="fas fa-copy" 
                                            title="Klik untuk meng-copy nomor kartu ini !" 
                                            >
                                        </i>
                                    </CopyToClipboard>
                                    </InputAddon>
                                    <Input
                                        type="text"
                                        className="form-control--large ta-center fw-semibold"
                                        value={card.list.isCreated ? "Nomor Seri Kartu : " + dataCard : "Coba periksa koneksi internet Anda !"}
                                        readOnly
                                        selectOnFocus
                                    />
                                </InputGroup>
                            </FormGroup>
                            <h6 className="fw-semibold margin-top-large">Ikuti instruksi berikut untuk membuat kartu member baru.</h6>
                            <p>1. Klik Icon untuk meng-copy/ menyalin ID Member</p>
                            <p>2. Buka software MSR605x yang telah diinstalasi.</p>
                            <p>3. Tempel (Paste) ID Member yang sudah tersalin pada kolom pertama yang tersedia.</p>
                            <p>4. Tekan tombol 'Write Card' hingga jendela kecil berwarna merah keluar.</p>
                            <p>5. Gesek kartu magnetic card kosong pada mesin card writer yang ada, tunggu hingga angka pada jendela kecil yang terbuka berubah menjadi angka 2, lalu tutup.</p>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <Button type="button" className="margin-right-small" onClick={(e) => closeModal(e)}> Kembali </Button>
                            {/* <Button buttonTheme="secondary" onClick={handleNewCardPrintSubmit}>
                                <small className="fw-semibold tt-uppercase ls-base">Print Data Customer</small>
                            </Button> */}
                        </ModalFooter>
            </Modal>
        );
    };

    return (
        <div className="admin-dashboard">
            <Section>
                <Panel>
                    <PanelHeader>
                        <h4 className="heading-title">Tulis Kartu Baru </h4>
                        {/* <h6 className="heading-subtitle">Non veniam do cupidatat culpa dolor consectetur fugiat dolore qui id amet ad incididunt.</h6> */}
                    </PanelHeader>
                    <PanelBody>
                        <div className="admin-user__content">
                            <Table fullWidth>
                                <thead className="table__head">
                                    <tr>
                                        <th>Jenis Kartu Member</th>
                                        <th>Cetak Nomor Kartu</th>
                                    </tr>
                                </thead>
                                <tbody className="table__body">
                                    <tr className="bg-white">
                                        <td>Taxi Online</td>
                                        <td>
                                            <Button onClick = {(e) => openModalGenerateNumber(e, idTaxiOnline)}>Cetak </Button>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td>Non Member</td>
                                        <td>
                                            <Button onClick = {(e) => openModalGenerateNumber(e, idNonMember)}>Cetak</Button>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td>Member</td>
                                        <td>
                                            <Button onClick = {(e) => openModalGenerateNumber(e, idMember)}>Cetak</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </PanelBody>
                </Panel>

                {renderDetailModal()}
            </Section>
        </div>
    )
};

export default AdminStoreCashierStockKartuView;