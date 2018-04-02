import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getMemberDetail, memberLogout } from '../../../actions/member.action';
import { CustomerPanelView } from '../CustomerPanel';

class CustomerPanel extends Component {   
    constructor(props) {
        super(props);

        this.state = {
            navigations: [
				{ id: 1, name: 'Layanan Kami', path: "/customer/store" },
				{ id: 2, name: 'Profil Anda', path: "/customer/profile" },
			],
            routes: [],
            menus: [
                {
                    category: '',
                    items: []
                }
            ],
            isAuthenticated: false 
        }

        this.getMemberDetail = this.getMemberDetail.bind(this);
        this.handleRouteRedirect = this.handleRouteRedirect.bind(this);
        this.logoutMember = this.logoutMember.bind(this);
    }

    componentDidMount = () => {
		this.getMemberDetail();
    }

    logoutMember = () => {
        const {
            dispatch
        } = this.props;

        dispatch(memberLogout());
    }

    getMemberDetail = () => {
		const {
			dispatch,
            isAuthenticated
        } = this.props;

        const dataMember = JSON.parse(localStorage.getItem('member'));

        dispatch(getMemberDetail(dataMember));
        
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
        const member = JSON.parse(localStorage.getItem('member'));
        return (
            <CustomerPanelView
                {...this.state} 
                {...this.props} 
                memberData={member}
                logoutMember={this.logoutMember}
            />
        )
    }
}

const mapStateToProps = (state) => {
	return {
		member: state.member
	}
}

export default connect(mapStateToProps)(CustomerPanel);