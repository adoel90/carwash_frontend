import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CustomerMyProfileView } from '../CustomerMyProfile';

import ProfileAccountContainer from './ProfileAccountContainer';
import ProfileTransactionContainer from './ProfileTransactionContainer';

// import { getMemberDetail } from '../actions/member.action';
import { getMemberDetail } from '../../../actions/member.action';

class CustomerMyProfile extends Component {


	constructor() {
		super();
		this.state = {
			submodules: [
				{ name: 'Informasi Akun', path: 'account', component: ProfileAccountContainer },
				{ name: 'Daftar Transaksi', path: 'transaction', component: ProfileTransactionContainer }
			]
		}

		this.getMemberDetail = this.getMemberDetail.bind(this);
		// this.toggleDialog = this.toggleDialog.bind(this);
		// this.showDialog = this.showDialog.bind(this);
		// this.hideDialog = this.hideDialog.bind(this);
	}

	componentDidMount = () => {
		this.getMemberDetail();
    }
    

    getMemberDetail = () => {
		const {
			memberData,
			dispatch,
			// accessToken
		} = this.props;


        // console.log(this.props);
		let requiredData = {
			// id: memberData.id
            // transaction: true
        
        }
        // console.log(requiredData);

		// dispatch(getMemberDetail(requiredData, accessToken));
		dispatch(getMemberDetail(requiredData));
	}

    render() {
        return(    
            <CustomerMyProfileView 
                {...this.state}
                {...this.props} 
                // toggleDialog={this.toggleDialog}
				// showDialog={this.showDialog}
                // hideDialog={this.hideDialog}    
                getMemberDetail = {this.getMemberDetail}
            />
        ) 
    }
}

// export default CustomerMyProfile;

const mapStateToProps = (state) => {
	return {
		member: state.member,
		dialog: state.dialog
	}
}

export default connect(mapStateToProps)(CustomerMyProfile);
