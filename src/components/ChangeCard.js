import React from 'react';

import PageBlock from './PageBlock';
import Form from './Form';
import FormText from './FormText';
import FormButton from './FormButton';

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
                <div className="padding-bottom-1">
                    <h4 className="fw-semibold">Ganti Kartu</h4>
                </div>
                <PageBlock>
                    <Form>
                        <div className="padding-bottom-2">
                            {this.props.users.map(this.userDetail)}
                        </div>

                        <div className="flex">
                            <div className="padding-bottom-3 column-auto">
                                <FormText type="email" placeholder="Email@domain.com" />
                            </div>
                            <div className="flex flex-row justify-content--flex-end margin-left-1">
                                <FormButton style="primary" type="submit" size="small">
                                    <small className="fw-bold tt-uppercase ls-base">Gantikan</small>
                                </FormButton>
                            </div>
                        </div>
                    </Form>
                </PageBlock>
            </div>
        )
    }
}

export default ChangeCard;
