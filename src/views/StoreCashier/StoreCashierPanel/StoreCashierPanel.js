import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StoreCashierDashboard, StoreCashierTopUp } from '../../StoreCashier';

import { StoreCashierPanelView } from '../StoreCashierPanel';

class StoreCashierPanel extends Component {   

    constructor(props) {

        super(props);     
        this.state = {
            routes: [
                        { id: 1, name: 'dashboard', path: `${props.match.url}`, component: StoreCashierDashboard },
                        { id : 2, name: 'topup', path: `${props.match.url}/topup-saldo`, component: StoreCashierTopUp }
                        
            ],
            menus: [
                    { 
                        // category: 'Store Name Selected',
                        category: <img src={require('../../../assets/images/805carwash_white.svg')} alt="805-Carwash" style={{width: "75%"}} />,
                        items: [
                            { id: 1, name: 'Dashboard', path: `${props.match.url}` }
                        ]
                    },
                    {
                        category: '',
                        items: [
                            { id: 1, name: 'Isi Ulang Saldo', path: `${props.match.url}/topup-saldo` },
                    
                        ]
                    }
            ]
        }
    }

    render() {
        
        return (
            <StoreCashierPanelView
                {...this.state} 
                {...this.props} 
            />
        )
    }
}

export default StoreCashierPanel;