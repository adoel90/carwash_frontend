import React from 'react';
import ChangeCard from '../components/ChangeCard';

class ChangeCardContainer extends React.Component {
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
            <ChangeCard {...this.state} />
        )
    }
}

export default ChangeCardContainer;
