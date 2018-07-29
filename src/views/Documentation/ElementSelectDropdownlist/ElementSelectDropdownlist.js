import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStoreList } from '../../../actions/store.action';
import { ElementSelectDropdownlistView } from '../ElementSelectDropdownlist';

function mapStateToProps(state) {
    return {
        store: state.store,
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
    }
};

class ElementSelectDropdownlist extends Component {

    constructor(){
        super();
        this.handleClickChange = this.handleClickChange.bind(this);

        this.state = {
            storeId: {}
        };

    };
    
    componentDidMount = () => {
        const {getStoreListDispatch } = this.props;
        getStoreListDispatch();
      
    };

    
    //#
    handleClickChange = (e) => {

        const target = e.target;
        const name = target.name;
        const value = target.value;

        //GET STORE ID
        this.setState({
            ...this.state,
            storeId: value
        }, () => {
            console.log('Store ID : ',this.state.storeId);
        });
    };

    
    render() {
        return (
            <div>
                <ElementSelectDropdownlistView 
                    handleClickChange = {this.handleClickChange}
                    {...this.state} 
                    {...this.props} />
            </div>
        )
    }
};

// export default ElementSelectDropdownlist;
export default connect( mapStateToProps, mapDispatchToProps )(ElementSelectDropdownlist);