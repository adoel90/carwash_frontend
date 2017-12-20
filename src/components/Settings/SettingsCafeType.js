import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { 
	SettingsCafeMenuList, 
	SettingsNewCafeMenu, 
	SettingsUpdateCafeMenu 
} from '../Settings';
import { PageBlock, PageBlockGroup } from '../Page';
import { Modal, Table } from 'reactstrap';
import { ModalHeader, ModalContent, ModalFooter } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputGroup, InputAddon, InputCurrency, Label } from '../Input';
import { Button } from '../Button';
import { Row } from '../Grid';

class SettingsCafeType extends Component {
	constructor() {
		super();
		this.renderCafeMenuList = this.renderCafeMenuList.bind(this);
	}

	renderCafeMenuList = () => {
		const {
			type,
			cafe,
			cafeList
		} = this.props;

		if(cafe.list.isFetching) {
			return <p>Sedang memuat daftar menu cafe. Mohon tunggu sebentar...</p>
		}

		if(cafe.list.isLoaded) {
			console.log(cafeList);
			
			if(cafeList.length) {
				return <SettingsCafeMenuList {...this.props} />
			}
			else {

				return (
					<div className="flex justify-content--center flex-column ta-center">
						<i className="fi flaticon-warning icon icon--gigant clr-danger"></i>
						<p>Maaf, sistem tidak dapat menemukan daftar menu untuk kategori <span className="fw-semibold">{type.name}</span>. <br /> Silahkan klik tombol di bawah untuk menambahkan menu baru.</p>
					</div>
				)
			}
		}
	}

	render = () => {
		const {
			type,
			handleCafeMenuCreate
		} = this.props;

		return (
			<PageBlockGroup>
				<PageBlock>
					{ this.renderCafeMenuList() }
				</PageBlock>
				<PageBlock className="flex justify-content--flex-end" extension>
					<Button type="button" buttonTheme="primary" className="clr-light" onClick={() => handleCafeMenuCreate()}>
						<small className="fw-semibold tt-uppercase ls-base">Tambah Menu Baru</small>
					</Button>
				</PageBlock>
				<SettingsNewCafeMenu {...this.props} />
				<SettingsUpdateCafeMenu {...this.props} />
			</PageBlockGroup>
		)
	}
}

export default SettingsCafeType;
