import React from 'react';

export default class Topup extends React.Component {
    render() {
        return(
            <div id="topup">
                <div className="padding-bottom-3">
                    <h4 className="fw-semibold">Topup</h4>
                </div>
                <div className="card card__form">
                    <div className="topup--card">
                        <div className="topup--icon">
                            <i className="material-icons">credit_card</i>
                        </div>
                        <div className="topup--description">
                            <p className="fw-semibold">Silahkan gesek <br /> kartu member Anda di sini >></p>
                            <hr />
                            <p>*Untuk melanjutkan proses topup kartu Anda</p>
                        </div>
                    </div>
                    {/* <div className="topup--saldo">
                        <div className="topup--identity">
                            <h3 className="heading-5">John Doe</h3>
                            <p>johndoe@gmail.com</p>
                            <p>+628211977XXXX</p>
                            <p>Jl. Kelapa gading, Jakarta Utara</p>
                        </div>

                        <form className="form-inline">
                            <div className="form-input">
                                <div className="input-group">
                                    <span className="input-group-addon">Rp.</span>
                                    <input type="number" className="form-control" placeholder="Nominal Saldo" />
                                </div>
                            </div>

                            <div className="form-button">
                                <button type="submit" className="button button--primary">Daftar</button>
                            </div>
                        </form>
                    </div> */}
                </div>
            </div>
        )
    }
}
