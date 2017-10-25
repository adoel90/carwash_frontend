import React from 'react';
import PageBlock from '../components/PageBlock';

class Register extends React.Component {
	render() {
		return(
			<div id="register">
				<div className="padding-bottom-1">
					<h4 className="fw-semibold">Pendaftaran</h4>
				</div>

				<PageBlock>
					{/* <Form>
						<div className="padding-bottom-3">
							<FormText type="text" label="Nama lengkap" placeholder="Nama lengkap" />
							<FormText type="text" label="Alamat email" placeholder="Alamat email" />
							<FormText type="text" label="Nomor Telepon" placeholder="Nomor Telepon" />
							<FormText type="textarea" label="Alamat" placeholder="Alamat" />
						</div>
						<div className="flex flex-row justify-content--flex-end">
							<FormButton buttonStyle="primary" buttonType="submit" buttonSize="large">
								<small className="fw-bold tt-uppercase ls-base">Daftarkan</small>
							</FormButton>
						</div>
					</Form> */}
				</PageBlock>
			</div>
		)
	}
}

export default Register;
