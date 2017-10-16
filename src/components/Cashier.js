import React from 'react';

export default class Cashier extends React.Component {
    render() {
        return(
            <section className="page-section">
                <div className="page-container">
                    <div className="page-heading">
                        <h4>Pendaftaran</h4>
                    </div>
                    <div className="page-content">
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
            </section>
        )
    }
}
