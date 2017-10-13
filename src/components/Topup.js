import React from 'react';

export default class Topup extends React.Component {
    render() {
        return(
            <section className="page-section">
                <div className="page-container">
                    <div className="page-heading">
                        <h1 className="heading-4">Topup</h1>
                    </div>
                    <div className="page-content">
                        <div className="topup--card">
                            <div className="topup--icon">
                                <i class="material-icons">credit_card</i>
                            </div>
                            <div className="topup--description">
                                <h2>Silahkan gesek <br /> kartu member Anda di sini >></h2>
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
            </section>
        )
    }
}
