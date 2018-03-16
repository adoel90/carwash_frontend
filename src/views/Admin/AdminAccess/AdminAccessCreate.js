import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllModule } from '../../../actions/module.action';
import { createNewAccess } from '../../../actions/access.action';

import AdminAccessCreateView from './AdminAccessCreateView';

class AdminAccessCreate extends Component {
      constructor() {
            super();
            this.state = {
                  newAccess: {
                        name: '',
                        module: []
                  }
            }
            this.getModuleList = this.getModuleList.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleFormSubmit = this.handleFormSubmit.bind(this);
      }

      componentDidMount = () => {
            this.getModuleList();
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
                  newAccess
            } = this.state;
            
            const {
                  createNewAccess
            } = this.props;
            
            e.preventDefault();
                  const requiredData = {
                        name: newAccess.name,
                        minimum: newAccess.minimum,
                        bonus: newAccess.bonus,
                        refund: newAccess.refund
                  }
      
                  createNewAccess(requiredData);
      }
      
      getModuleList = () => {
            const {
                  getAllModule
            } = this.props;

            getAllModule();
      }
      
      render() {
            return (
                  <AdminAccessCreateView 
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
            module: state.module
      }
}

const mapDispatchToProps = (dispatch) => {
      return {
            getAllModule: () => dispatch(getAllModule()),
            action: bindActionCreators({ createNewAccess }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAccessCreate);