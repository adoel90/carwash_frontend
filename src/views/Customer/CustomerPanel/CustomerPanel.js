//VendorPanel.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomerOurService  } from '../../Customer';
import { CustomerPanelView } from '../CustomerPanel';

class CustomerPanel extends Component {   

    constructor(props) {

        super(props);

        this.state = {

            routes: [
                { id: 1, name: 'dashboard', path: `${props.match.url}`, component: CustomerOurService }
            ],
            menus: [
                // { 
                //     category: '',

                //     items: [
                //         { id: 1, name: 'Heading', path: `${props.match.url}/header`},
                //     ]
                // },
                {
                    category: '',
                    items: [
                        { id: 1, name: 'Layanan Kami', path: `${props.match.url}` },
                        { id: 2, name: 'Profil Anda', path: `${props.match.url}/my-profile` },
                        
                        
                    ]
                }
            ]
        }
    }

    render() {
        return (
            <CustomerPanelView
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

export default CustomerPanel;
