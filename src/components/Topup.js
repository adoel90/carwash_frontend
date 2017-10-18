import React from 'react';

import PageBlock from './PageBlock';
import Form from './Form';
import FormText from './FormText';
import FormButton from './FormButton';

class Topup extends React.Component {
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
            <div id="topup">
                <div className="padding-bottom-1">
                    <h4 className="fw-semibold">Topup</h4>
                </div>
                <PageBlock>
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
                        <div className="padding-bottom-2">
                            {this.props.users.map(this.userDetail)}
                        </div>

                        <Form>
                            <div className="flex">
                                <div className="padding-bottom-3 column-auto">
                                    <FormText type="number" placeholder="Nominal Saldo" />
                                </div>
                                <div className="flex flex-row justify-content--flex-end margin-left-1">
                                    <FormButton style="primary" type="submit" size="small">
                                        <small className="fw-bold tt-uppercase ls-base">Isi Ulang</small>
                                    </FormButton>
                                </div>
                            </div>
                        </Form>
                    </div>
                </PageBlock>
            </div>
        )
    }
}

export default Topup;
