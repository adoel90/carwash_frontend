import React from 'react';
import { SettingsUpdateMember } from '../Settings';
import SettingsMemberDetailContainer from '../../containers/SettingsMemberDetailContainer';
import { Modal } from 'reactstrap';
import { PageBlock } from '../Page';
import { Row } from '../Grid';
import { ModalHeader, ModalContent, ModalFooter, ModalDialog } from '../Modal';
import { Form, FormGroup } from '../Form';
import { Input, InputAddon, InputGroup, InputCurrency, Label } from '../Input';
import { Button } from '../Button';
import { Alert } from '../Alert';

import { SettingsMemberList } from '../Settings';

class SettingsMember extends React.Component {
	constructor() {
		super();
		this.renderMemberList = this.renderMemberList.bind(this);
	}

	renderMemberList = () => {
		const {
			member
		} = this.props;

		if(member.list.isFetching) {
			return <p>Sedang memuat data member. Tunggu sebentar...</p>
		}

		else if(member.list.isLoaded) {
			return <SettingsMemberList {...this.props} />
		}

		else if(member.list.isError) {
			return <p>Maaf, terdapat kesalahan dalam memuat data member.</p>
		}
	}


	render = () => {
		const {
			member,
			selectedMember
		} = this.props;

		return (
			<div className="inner-view">
				<div className="padding-bottom-2">
					<h4 className="fw-semibold">Daftar Member</h4>
					{/* <p className="clr-passive">Untuk melihat informasi member, silahkan klik baris member yang diinginkan.</p> */}
				</div>
				<PageBlock>
					{ this.renderMemberList() }
				</PageBlock>
				<SettingsUpdateMember {...this.props} />
				<SettingsMemberDetailContainer {...this.props} />
			</div>
		)
	}
}

export default SettingsMember;
