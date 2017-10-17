import React from 'react';

class Register extends React.Component {
    render() {
        return(
            <div id="register">
                <div className="padding-bottom-3">
					<h4 className="fw-semibold">Pendaftaran</h4>
				</div>

                <div className="card card__form">
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
                </div>
            </div>
        )
    }
}

export default Register;
