import React, { Component } from 'react'
import NumberFormat from 'react-number-format';
import { PageBlock, PageBlockGroup } from '../../../components/Page';
import { Button } from '../../../components/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Form, FormGroup } from '../../../components/Form';
import { Input, Label } from '../../../components/Input';

class CashierNewCardInstruction extends Component {

    render () {
        const {
            member,
            isModalOpen,
            toggleModal,
            newMember,
            // handleNewCardInstructionSubmit,
            handleNewCardPrintSubmit
        } = this.props;

        
        if(newMember.isCreated) {
            return (
                <Modal
                    isOpen={isModalOpen.newCardInstruction}>
                    <ModalHeader className="align-center">
                        <h6 className="fw-semibold">Instruksi Pembuatan Kartu Baru</h6>
                    </ModalHeader>
                    {/* <Form onSubmit={handleNewCardInstructionSubmit}> */}
                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Input
                                    type="text"
                                    className="form-control--large ta-center fw-semibold"
                                    value={newMember.data.data.result.card.id}
                                    readOnly
                                    selectOnFocus
                                />
                            </FormGroup>
                            <h6 className="fw-semibold margin-top-large">Ikuti instruksi berikut untuk membuat kartu member baru.</h6>
                            <p>1. Salin (Copy) ID Member yang telah dihasilkan pada kolom diatas.</p>
                            <p>2. Buka software MSR605x yang telah diinstalasi.</p>
                            <p>3. Tempel (Paste) ID Member yang sudah tersalin pada kolom pertama yang tersedia.</p>
                            <p>4. Tekan tombol 'Write Card' hingga jendela kecil berwarna merah keluar.</p>
                            <p>5. Gesek kartu magnetic card kosong pada mesin card writer yang ada, tunggu hingga angka pada jendela kecil yang terbuka berubah menjadi angka 2, lalu tutup.</p>
                        </ModalBody>
                        <ModalFooter className="flex justify-content--flex-end">
                            <Button className="margin-right-small" > Kembali </Button>
                            <Button buttonTheme="secondary" onClick={handleNewCardPrintSubmit}>
                                <small className="fw-semibold tt-uppercase ls-base">Print Data Customer</small>
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            )
        }

        return null;
    }
}

export default CashierNewCardInstruction