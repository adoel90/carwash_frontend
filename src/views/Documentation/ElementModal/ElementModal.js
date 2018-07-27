import React, { Component } from 'react';
import { ElementModalView } from '../ElementModal';

class ElementModal extends Component {

    constructor(){
        super();
        this.handleClickShowModal = this.handleClickShowModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleClickCancelModal = this.handleClickCancelModal.bind(this);

        this.state = {
        
            isModalOpen: {
                show: false
          },
        };
    };

    toggleModal = (name) => {
        const { isModalOpen } = this.state;
        
        this.setState({
                ...this.state,
                isModalOpen: {
                    [name]: !isModalOpen[name]
                }
        })
    };

    handleClickShowModal = (e) => {
        e.preventDefault();
        console.log("Show Modal");
        this.toggleModal('show');

    };

    handleClickCancelModal = (e) => {
        e.preventDefault();
        this.setState({
            isModalOpen:{
                show: false
            }
        });
    };
    
    render() {
        return (
            <div>
                <ElementModalView 
                    handleClickShowModal = {this.handleClickShowModal}
                    handleClickCancelModal = {this.handleClickCancelModal}
                    toggleModal = {this.toggleModal}
                    {...this.state} 
                    {...this.props} />
            </div>
        )
    }
}

export default ElementModal;