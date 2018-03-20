import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategoryList, createStore } from '../../../actions/store.action';
import { getUserList } from '../../../actions/user.action';

import AdminStoreCreateView from './AdminStoreCreateView';

class AdminStoreCreate extends Component {
      constructor() {
            super();
            this.getCategoryList = this.getCategoryList.bind(this);
            this.getUserList = this.getUserList.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
            this.state = {
                  newStore: {
                      name: '',
                      category: '',
                      user: ''
                  }
              }
      }

      componentDidMount = () => {
            this.getCategoryList();
            this.getUserList();
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
                  newStore
            } = this.state;
            
            const {
                  action
            } = this.props;
            
            e.preventDefault();

            const requiredData = {
                  name: newStore.name,
                  category: newStore.category,
                  user: newStore.user
            }

            action.createStore(requiredData);
      }

      getCategoryList = () => {
            const {
                  action
            } = this.props;

            action.getCategoryList();
      }

      getUserList = () => {
            const {
                  action
            } = this.props;

            action.getUserList();
      }
      
      render() {
            return (
                  <AdminStoreCreateView 
                        {...this.state} 
                        {...this.props} 
                        handleInputChange={this.handleInputChange}
                        handleFormSubmit={this.handleFormSubmit}
                  />
            );
      }
}

const mapStateToProps = (state) => {
      return {
            store: state.store,
            user: state.user
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            action: bindActionCreators({ createStore, getCategoryList, getUserList }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreCreate);