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
					<h5 className="fw-semibold">Profil Saya</h5>
					<div className="row">
						<div className="column-6">
							<Form>
								<FormText
									label="Nama Lengkap"
									placeholder="Nama member"
									value="David Kurnia Kristiadi"
									readonly="true"
								/>
							</Form>
						</div>
					</div>
				</PageBlock>
			</div>
		);
	}
}
export default ProfileAccount;
