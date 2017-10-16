import React from 'react';

class Topup extends React.Component {
    constructor() {
        super();
        this.userDetail = this.userDetail.bind(this);
    }

    userDetail = (item) => {
        return(
            <div className="topup--identity" key="item.id">
                <h5 className="heading-5">{item.name}</h5>
                <p>{item.email}</p>
                <p>{item.phone}</p>
                <p>{item.address}</p>
            </div>
        )
    }

    render() {
        return(
            <div id="topup">
                <div className="padding-bottom-3">
                    <h4 className="fw-semibold">Topup</h4>
                </div>
                <div className="card card__form">
                    {/* <div className="topup--card">
                        <div className="topup--icon">
                            <i className="material-icons">credit_card</i>
                        </div>
                        <div className="topup--description">
                            <p className="fw-semibold">Silahkan gesek <br /> kartu member Anda di sini >></p>
                            <hr />
                            <p>*Untuk melanjutkan proses topup kartu Anda</p>
                        </div>
                    </div> */}
                    <div className="topup--saldo">
                        {this.props.users.map(this.userDetail)}

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
                    </div>
                </div>
            </div>
        )
    }
}

export default Topup;
