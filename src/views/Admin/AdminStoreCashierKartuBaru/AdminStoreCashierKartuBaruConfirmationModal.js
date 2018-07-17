import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Button } from '../../../components/Button';
import { Alert } from '../../../components/Alert/index';
import { Row, Column } from '../../../layouts/Grid';
import { Badge } from '../../../components/Badge';

import { Form, FormGroup } from '../../../components/Form';
import { FormField } from '../../../layouts/Form';
import { InputCashier, Input, InputGroup, InputAddon, InputCurrency, Label, Select, Textarea } from '../../../components/Input';
import Currency from '../../../components/Currency';

import NumberFormat from 'react-number-format';
import { default as CardIcon } from '../../../assets/icons/Business/credit-card-3.svg';

class AdminStoreCashierKartuBaruConfirmationModal extends Component {

    //#RENDER SALDO AWAL MEMBER
    renderSaldoAwalMember = () => {
        const { topupData, handleSaldoAwalMember, optionTopUpMember} = this.props;

		const center ={
			'marginLeft' : '5px'
		};

		return (
			<div>
				<div className="flex justify-content--space-around">
					{
						optionTopUpMember.map((newsaldo) => {
							return (
								<div>
									<Button type="button" theme="primary" key={newsaldo.id} value={newsaldo} onClick={(e) => handleSaldoAwalMember(newsaldo, e)}>
										<h5>Rp. {parseFloat(newsaldo.balance).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 2})}</h5>
									</Button>
									<h5><small className="margin-right-small center">Bonus : { newsaldo.bonus }</small></h5>
								</div>
							);
						})
					}
				</div>
			</div>
		)
    };

    render() {

        const { isModalOpen,
            updateMemberNewCardConfirmation,
            toggleModal,
            handleToggleUpdate,
            handleUpdateCreateMember,
            handleInputChange,
            handleInputChangeInModalUpdate,
            selectedMember,
            newCardData,
            handleCancelModal,
            paymentMethod,
            typeNumberMember,
            member,
            listNominalNewCustomer,
            card,
            handleNominal,
            optionTopUpMemberThemeButton,
            memberNominal
        } = this.props;


        const cardMember = selectedMember.card ? selectedMember.card.type.name : null;

        return (
            <Modal isOpen={isModalOpen.updateMemberNewCardConfirmation}>
                <ModalHeader align="center">
                    <h6 className="fw-semibold">Buat Member Baru</h6>
                </ModalHeader>
                {/* <Form onSubmit={handleUpdateCreateMember}> */}
                <Form>
                    <ModalBody>
                        <Row className="margin-bottom-small">
    
                            {/* {typeNumberMember  === 1 ? 
                                    <Column md={6}>
                                        <FormGroup>
                                            <FormField label="Nama Lengkap">
                                                <InputGroup>
                                                    <InputAddon>
                                                        <i className="far fa-user"></i>
                                                    </InputAddon>
                                                    <Input
                                                        name="name"
                                                        type="text"
                                                        placeholder="Tulis Nama Lengkap"
                                                        onChange={(e) => handleInputChangeInModalUpdate('selectedMember', e)}
                                                        required="true"
                                                    />
                                                </InputGroup>
                                            </FormField>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormField label="Alamat E-mail">
                                                <InputGroup>
                                                    <InputAddon>
                                                        <i className="far fa-envelope"></i>
                                                    </InputAddon>
                                                    <Input
                                                        name="email"
                                                        type="email"
                                                        placeholder="Tulis Alamat email"
                                                        onChange={(e) => handleInputChange(newCardData, e)}
                                                    />
                                                </InputGroup>
                                            </FormField>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormField label="Nomor Telepon">
                                                <InputGroup>
                                                    <InputAddon>
                                                        <i className="fas fa-phone"></i>
                                                    </InputAddon>
                                                    <Input
                                                        name="phone"
                                                        type="text"
                                                        placeholder="+62"
                                                        onChange={(e) => handleInputChange(newCardData, e)}
                                                    // required="false"
                                                    />
                                                </InputGroup>
                                            </FormField>
                                        </FormGroup>

                                        <FormGroup>
                                            <FormField label="Alamat">
                                                <InputGroup>
                                                    <InputAddon>
                                                        <i className="fas fa-map-marker-alt"></i>
                                                    </InputAddon>
                                                    <Input
                                                        name="address"
                                                        type="textarea"
                                                        placeholder="Provinsi, Kecamatan, Jalan, Kode Pos"
                                                        onChange={(e) => handleInputChange(newCardData, e)}
                                                    // required="false"
                                                    />
                                                </InputGroup>
                                            </FormField>
                                        </FormGroup>
                                    </Column>
                                  : null  
                            }  */}

                             <Column md={6}>
                                <FormGroup>
                                    <FormField label="Nama Lengkap">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-user"></i>
                                            </InputAddon>
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder="Tulis Nama Lengkap"
                                                onChange={(e) => handleInputChangeInModalUpdate('selectedMember', e)}
                                                required="true"
                                            />
                                        </InputGroup>
                                    </FormField>
                                </FormGroup>
                                <FormGroup>
                                    <FormField label="Alamat E-mail">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="far fa-envelope"></i>
                                            </InputAddon>
                                            <Input
                                                name="email"
                                                type="email"
                                                placeholder="Tulis Alamat email"
                                                onChange={(e) => handleInputChange(newCardData, e)}
                                            />
                                        </InputGroup>
                                    </FormField>
                                </FormGroup>
                                

                                <FormGroup>
                                    <FormField label="Alamat">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-map-marker-alt"></i>
                                            </InputAddon>
                                            <Input
                                                name="address"
                                                type="textarea"
                                                placeholder="Provinsi, Kecamatan, Jalan, Kode Pos"
                                                onChange={(e) => handleInputChange(newCardData, e)}
                                            // required="false"
                                            />
                                        </InputGroup>
                                    </FormField>
                                </FormGroup>
                            </Column>
                            <Column md={6}>
                                <FormGroup>
                                    <FormField label="Nomor Telepon">
                                        <InputGroup>
                                            <InputAddon>
                                                <i className="fas fa-phone"></i>
                                            </InputAddon>
                                            <Input
                                                name="phone"
                                                type="text"
                                                placeholder="+62"
                                                onChange={(e) => handleInputChange(newCardData, e)}
                                            // required="false"
                                            />
                                        </InputGroup>
                                    </FormField>
                                </FormGroup>
                                <FormGroup>
                                    <FormField label="Tipe Kartu">
                                        <Input
                                            name="name"
                                            type="text"
                                            placeholder={selectedMember.card ? selectedMember.card.type.name : "Ulangi peng-copyan nomor seri kartu"}
                                            defaultValue={selectedMember.card ? selectedMember.card.type.name : "Ulangi peng-copyan nomor seri kartu"}
                                            // onChange={(e) => handleInputChangeInModalUpdate('selectedMember', e)}
                                            readOnly
                                        />
                                    </FormField>
                                </FormGroup>
                                <FormGroup>
                                    <FormField label="Metode Pembayaran">
                                        <Select
                                            name="payment"
                                            type="select"
                                            onChange={(e) => handleInputChange(newCardData, e)}
                                            deafultValue={newCardData.payment}>
                                            {
                                                paymentMethod.map((method) => {
                                                    return <option value={method.id}>{method.name}</option>
                                                })
                                            }
                                        </Select>
                                    </FormField>
                                </FormGroup>
                            </Column> 
                            <Column md={12}>
                                <FormGroup>
                                    <FormField label={optionTopUpMemberThemeButton === false ? "Saldo Awal" : "TERPILIH : Rp. " + memberNominal}>
                                    
                                        { cardMember === "Member" ? this.renderSaldoAwalMember() : null } 
                                        {/* <Input
                                            name="name"
                                            type="text"
                                            placeholder={selectedMember.card ? selectedMember.card.type.min : null}
                                            defaultValue={selectedMember.card ? selectedMember.card.type.min : null}
                                            onChange={(e) => handleInputChangeInModalUpdate('selectedMember', e)}
                                        /> */}
                                    </FormField>
                                </FormGroup>
                                
                                {/* <FormGroup>
                                    <FormField label="Pilih Saldo Awal : ">
                                        <div>
                                            <div className="flex justify-content--space-around" >
                                                {
                                                    card.nominal.isLoaded ? card.nominal.data.result.map((value) => {
                                                        return(
                                                            <Button onClick={handleNominal} className="margin-right-small" type="button" theme="primary" key={value.id} value={value} >
                                                                <h5>Rp.{value.saldo}</h5>
                                                            </Button>
                                                        )

                                                    }) : null
                                                }
                                            </div>
                                        </div>
                                    </FormField>
                                </FormGroup> */}
                            </Column>
                            {/* <Column md={6}>
                                <FormGroup>
                                    <FormField label="Bonus">
                                         {console.log(selectedMember.card ? selectedMember.card.type.bonus: null)}
                                        <Input
                                            name="name"
                                            type="text"
                                            placeholder={selectedMember.card ? selectedMember.card.type.bonus: null}
                                            defaultValue={selectedMember.card ? selectedMember.card.type.bonus: null}
                                            onChange={(e) => handleInputChangeInModalUpdate('selectedMember', e)}
                                            readOnly
                                        />
                                    </FormField>
                                </FormGroup>
                            </Column> */}

                        </Row>
                    </ModalBody>

                    <ModalFooter className="flex justify-content--flex-end">
                        <Button className="margin-right-small" theme="danger" onClick={(e) => handleCancelModal(e)}> Cancel </Button>
                        <Button type="Submit" onClick={(e) => handleUpdateCreateMember(e)}>Simpan</Button>
                    </ModalFooter>

                </Form>
            </Modal>
        )
    }
}


export default AdminStoreCashierKartuBaruConfirmationModal;