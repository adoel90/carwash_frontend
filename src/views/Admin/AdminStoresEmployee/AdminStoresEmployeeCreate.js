import React, { Component } from 'react';
import { AdminStoresEmployeeCreateView } from '../AdminStoresEmployee';

class AdminStoresEmployeeCreate extends Component {
    
    constructor(){
        super()
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            newStaff: {
                name: '',
            }
        }
    }


    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        
    }

    handleInputChange = (object, e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        console.log(value);
        
        this.setState({
              ...this.state,
              [object]: {
                    ...this.state[object],
                    [name]: value
              }
        });
    }

    render() {
        
        return (
            <div>
                 <AdminStoresEmployeeCreateView 
                      handleInputChange = {this.handleInputChange}
                      handleFormSubmit = { this.handleFormSubmit }
                    {...this.state} 
                    {...this.props} />
                
            </div>
        )
        
           
    }
}

export default AdminStoresEmployeeCreate;