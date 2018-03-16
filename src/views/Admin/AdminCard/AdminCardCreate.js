import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminCardCreateView } from '../AdminCard';
import { createNewCardType } from '../../../actions/card.action';
import { getAccessList } from '../../../actions/access.action';

class AdminCardCreate extends Component {
      constructor() {
            super();
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
            this.state = {
                  newCard: {
                        name: '',
                        minimum: '',
                        bonus: '',
                        refund: 0
                  }
            }
      }

      handleInputChange = (object, e) => {
            const target = e.target;
            const name = target.name;
            const value = target.value;

            this.setState({
                  ...this.state,
                  [object]: {
                        ...this.state[object],
                        [name]: value
                  }
            });
      }

      handleFormSubmit = (e) => {
            const {
                  newCard
            } = this.state;
            
            const {
                  createNewCardType
            } = this.props;
            
            e.preventDefault();
                  const requiredData = {
                        name: newCard.name,
                        minimum: newCard.minimum,
                        bonus: newCard.bonus,
                        refund: newCard.refund
                  }
      
                  createNewCardType(requiredData);
      }

      render() {
            return (
                  <AdminCardCreateView 
                        {...this.state} 
                        {...this.props} 
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                  />
            )
      }
}

const mapStateToProps = (state) => {
      return {
            card: state.card
      };
}

const mapDispatchToProps = (dispatch) => {
      return {
            createNewCardType: (data) => dispatch(createNewCardType(data))
      }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminCardCreate);