import React from 'react';

class ChangeCard extends React.Component {
    constructor() {
        super();
        this.userDetail = this.userDetail.bind(this);
    }

    userDetail = (item) => {
        return(
            <div className="topup--identity" key="item.id">
                <h5 className="fw-semibold">{item.name}</h5>
                <p>{item.email}</p>
                <p>{item.phone}</p>
                <p>{item.address}</p>
            </div>
        )
    }

    render() {
        return(
            <div id="change-card">
                <div className="padding-bottom-3">
                    <h4 className="fw-semibold">Ganti Kartu</h4>
                </div>
                <div className="card card__form">
                    <div className="change-card">
                        {/* {this.props.users.map(this.userDetail)} */}

                        <form className="form-vertical">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="ID Card" />
                            </div>

                            <div className="form-button">
                                <button type="submit" className="button button--primary">Change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangeCard;
