import React from 'react';

import Topup from '../components/Topup';

export default class TopupContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            users: [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'johndoe@gmail.com',
                    phone: '+628211977XXXX',
                    address: 'Jl. Kelapa gading, Jakarta Utara'
                }
            ]
        }
    }

    render() {
        return(
            <Topup {...this.state} />
        )
    }
}
