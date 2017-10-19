import React from 'react';
import PageBlock from '../components/PageBlock';

import Form from '../components/Form';
import FormGroup from '../components/FormGroup';
import FormText from '../components/FormText';

class ProfileAccount extends React.Component {
	render() {
		return (
			<div id="profile-account">
				<PageBlock>
					<h5 className="fw-semibold padding-bottom-3">Profil Saya</h5>
					<Form>
						<FormText
							label="Nama Lengkap"
							placeholder="Nama member"
							value="David Kurnia Kristiadi"
							readonly="true"
						/>
						<FormText
							label="Alamat Email"
							placeholder="Alamat email"
							value="davidkurniakristiadi@gmail.com"
							readonly="true"
						/>
					</Form>
				</PageBlock>
			</div>
		);
	}
}
export default ProfileAccount;
