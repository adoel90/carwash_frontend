import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import { PageBlock } from '../Page';
import { Row } from '../Grid';
import { ModalHeader, ModalContent, ModalFooter, ModalDialog } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputAddon, InputGroup, InputCurrency, Label } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';
import { TabContent } from '../Tab';
import { Nav, NavTabLink, NavItem } from '../Nav';

class SettingsMemberDetail extends Component {
    render () {
        const {
			isModalOpen,
			toggleModal,
            selectedMember,
            toggleTab,
            activeTab
		} = this.props;

		return (
			<Modal
				name="viewMemberModal"
				className="modal-dialog--large"
				isOpen={isModalOpen.viewMemberDetail}
				toggle={() => toggleModal('viewMemberDetail')}>
				<ModalHeader align="center">
					<h6 className="fw-semibold">Lihat Informasi Member</h6>
				</ModalHeader>
				<ModalContent>
                    <Nav tabs className="flex justify-content--space-between">
                        <NavItem>
                            <NavTabLink
                                active={activeTab === 0}
                                onClick={() => toggleTab(0)}>
                                Informasi User
                            </NavTabLink>
                            <NavTabLink
                                active={activeTab === 1}
                                onClick={() => toggleTab(1)}>
                                Log Transaksi
                            </NavTabLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab} tabIndex={0}>
                        <Form>
                            <Row>
                                <div className="column-6">
                                    <FormGroup>
                                        <Label className="fw-semibold">Nama Member</Label>
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="ion-person"></i>
                                            </InputAddon>
                                            <Input
                                                placeholder="Nama lengkap member"
                                                value={selectedMember.name}
                                                readOnly
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="fw-semibold">Alamat Email</Label>
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="ion-email"></i>
                                            </InputAddon>
                                            <Input
                                                placeholder="Alamat email member"
                                                value={selectedMember.email}
                                                readOnly
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="fw-semibold">Nomor Telepon</Label>
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="ion-ios-telephone"></i>
                                            </InputAddon>
                                            <Input
                                                placeholder="Nomor kontak member yang bisa dihubungi"
                                                value={selectedMember.phone}
                                                readOnly
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="fw-semibold">Alamat</Label>
                                        <Input
                                            type="textarea"
                                            value={selectedMember.address}
                                            readOnly
                                        />
                                    </FormGroup>
                                </div>
                                <div className="column-6">
                                    <FormGroup>
                                        <Label className="fw-semibold">Saldo Saat Ini</Label>
                                        <InputGroup>
                                            <InputAddon>
                                                <small className="tt-uppercase ls-base fw-semibold">RP</small>
                                            </InputAddon>
                                            <InputCurrency
                                                placeholder="Saldo yang dimiliki member saat ini"
                                                value={selectedMember.balance}
                                                readOnly
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="fw-semibold">Nomor Kartu</Label>
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="ion-card"></i>
                                            </InputAddon>
                                            <Input
                                                placeholder="Nomor kartu member"
                                                value={selectedMember.cardId}
                                                readOnly
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="fw-semibold">Tipe Kartu</Label>
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="ion-card"></i>
                                            </InputAddon>
                                            <Input
                                                placeholder="Nama lengkap member"
                                                value={selectedMember.cardType}
                                                readOnly
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                            </Row>
                        </Form>
                    </TabContent>
				</ModalContent>
				<ModalFooter className="flex justify-content--flex-end">
					<Button buttonTheme="danger" className="clr-light" onClick={() => toggleModal('viewMemberDetail')}>
						<small className="fw-semibold tt-uppercase ls-base">Tutup</small>
					</Button>
				</ModalFooter>
			</Modal>
		)
    }
}

export default SettingsMemberDetail