import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VendorCreateView } from '../VendorUser';
import { createNewVendor } from '../../../actions/vendor.action';

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {

    return {
        createNewVendor: (data) => dispatch(createNewVendor(data))
    }
}

class VendorCreate extends Component {

    constructor() {

        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {

            newVendorState: {
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

        const { newVendorState } = this.state;
        // console.log(this.state.newVendorState);

        const { createNewVendor } = this.props;
        
        e.preventDefault();

        
        if(newVendorState.password === newVendorState.confirmPassword) {

            const requiredData = {
    
                cafe_name: newVendorState.cafe_name,
                fullname: newVendorState.fullname,
                email: newVendorState.email,
                username: newVendorState.username,
                password: newVendorState.password
            }
            
            // console.log(requiredData);
            createNewVendor(requiredData);
        }
    }

    render() {
        return (
            <VendorCreateView 
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
)(VendorCreate);