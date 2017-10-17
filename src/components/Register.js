import React from 'react';
import PageBlock from '../components/PageBlock';
import Form from '../components/Form';
import FormText from '../components/FormText';


class Register extends React.Component {
	render() {
		return(
			<div id="register">
				<div className="padding-bottom-1">
					<h4 className="fw-semibold">Pendaftaran</h4>
				</div>

				<PageBlock>
					<Form>
						<div className="row">
							<div className="column-8">
								<FormText label="Nama lengkap" placeholder="Nama lengkap" />
								<FormText label="Alamat email" placeholder="Alamat email" />
								<FormText label="Nomor Telepon" placeholder="Nomor Telepon" />
								<FormText label="Alamat" placeholder="Alamat" />
							</div>
							<div className="column-4 flex flex-column">
								<div className="form-button">
									<button type="submit" className="button button--primary button--full button--large">
										<span className="fw-bold tt-uppercase ls-base">Daftar</span>
									</button>
								</div>
							</div>
						</div>
					</Form>
				</PageBlock>

				{/* <div className="card card__form">
					<form className="form-inline">
						<div className="form-input">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Nama Lengkap" />
							</div>
							<div className="form-group">
								<input type="number" className="form-control" placeholder="Nomor Telepon" />
							</div>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="E-Mail" />
							</div>
							<div className="form-group">
								<textarea type="text" className="form-control" rows="4" placeholder="Alamat"></textarea>
							</div>
						</div>

						<div className="form-button">
							<button type="submit" className="button button--primary button--large">Daftar</button>
						</div>
					</form>
				</div> */}
			</div>
		)
	}
}

export default Register;
