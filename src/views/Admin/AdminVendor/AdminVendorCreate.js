import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminVendorCreateView } from '../AdminVendor';
import { createNewAdminVendor } from '../../../actions/admin.vendor.action';


function mapStateToProps(state) {
    return {
        adminVendorState: state.adminVendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        createNewAdminVendor: (data) => dispatch(createNewAdminVendor(data))
    }
}

class AdminVendorCreate extends Component {

    constructor() {

        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {

            newAdminVendorState: {
                cafe_name: '',
                fullname: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
            }
        }        
    }

    handleInputChange = (object, e) => {

        const target = e.target;
        const name = target.name;
        const value = target.value;
        // console.log("Value Input Change : " + value);

        this.setState({
            ...this.state,
            [object]: {
                ...this.state[object],
                [name]: value
            }
        });
    }

    handleFormSubmit = (e) => {

        const { newAdminVendorState } = this.state;
        // console.log(this.state.newAdminVendorState);
        const { createNewAdminVendor } = this.props;
        
        e.preventDefault();

        if(newAdminVendorState.password === newAdminVendorState.confirmPassword) {

            const requiredData = {
    
                cafe_name: newAdminVendorState.cafe_name,
                fullname: newAdminVendorState.fullname,
                email: newAdminVendorState.email,
                username: newAdminVendorState.username,
                password: newAdminVendorState.password
            }
            
            console.log(requiredData);
            createNewAdminVendor(requiredData);
        }
    }

    render() {
        return (
            <AdminVendorCreateView 
                {...this.state} 
                {...this.props} 
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminVendorCreate);
