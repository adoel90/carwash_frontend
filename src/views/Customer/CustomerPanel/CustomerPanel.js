//VendorPanel.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { CustomerOurService, CustomerMyProfile  } from '../../Customer';
import { CustomerPanelView } from '../CustomerPanel';
import { getMemberDetail } from '../../../actions/member.action';


class CustomerPanel extends Component {   

    constructor(props) {

        super(props);
        this.getMemberDetail = this.getMemberDetail.bind(this);
        this.handleRouteRedirect = this.handleRouteRedirect.bind(this);

        this.state = {

            //#Ini Navigation "MainSubHeader"
            navigations: [
				{ id: 1, name: 'Layanan Kami', path: "/customer/store" },
				{ id: 2, name: 'Profil Anda', path: "/customer/profile" },
			],

            //#Ini Routing untuk COmponent
            routes: [
                // { id: 1, name: 'customerourservice', path: `${props.match.url}`, component: CustomerOurService },
                // { id: 2, name: 'customermyprofile', path: `${props.match.url}/account`, component: CustomerMyProfile }
                // { id: 2, name: 'customermyprofile', path: `${props.match.url}/account`, component: CustomerMyProfile }
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
                        // { id: 1, name: 'Layanan Kami', path: `${props.match.url}` },
                        // { id: 2, name: 'Profil Anda', path: `${props.match.url}/account` },
                        
                        
                    ]
                }
            ],

            isAuthenticated: false 
        }
    }

    componentDidMount = () => {
		this.getMemberDetail();
    }

    getMemberDetail = () => {
		const {
			member,
            dispatch,
            // accessToken,
            isAuthenticated
        } = this.props;
        

        const userLoginNow = localStorage.getItem('userData') ? localStorage.getItem('userData') : null;
        const dataVendorLoginNow = JSON.parse(userLoginNow);

		let requiredData = {
			id: dataVendorLoginNow.member.id
            // transaction: true
        
        }

        dispatch(getMemberDetail(requiredData,dataVendorLoginNow.accessToken));
        
        this.setState({
            ...this.state,
            isAuthenticated:true
        })
    }
    
    handleRouteRedirect = () => {

		const {

			isAuthenticated,
			match
		} = this.props;

		if(isAuthenticated) {
			return <Redirect from={`${match.url}`} to={`${match.url}/store`} />
		} else {
			return <Redirect from={`${match.url}`} to={`${match.url}/landing`} />
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

// export default CustomerPanel;


const mapStateToProps = (state) => {
	return {
		member: state.member,
		// dialog: state.dialog
	}
}

export default connect(mapStateToProps)(CustomerPanel);