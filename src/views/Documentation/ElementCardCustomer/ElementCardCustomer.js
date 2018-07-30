import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getMenuListStore } from '../../../actions/store.action';
import { ElementCardCustomerView } from '../ElementCardCustomer';


function mapStateToProps(state) {
    return {
        store: state.store
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getMenuListStoreDispatch: (data) => dispatch(getMenuListStore(data)),
    }
};


class ElementCardCustomer extends Component {

    constructor(){
        super();
        this.handleSelectMenu = this.handleSelectMenu.bind(this);

        this.state = {
            storeMenuList : [],
            selectedMenuList: [],
            searchMenu: {
				searchText: ''
			},
        };
    };

    componentDidMount(){

        const { getMenuListStoreDispatch } = this.props;

        let requireData = {
            id: 57 //Rambo Carwash (Service Store)
        };
        getMenuListStoreDispatch(requireData);
    };

    componentDidUpdate(prevProps){
        
        const { storeMenuList } = this.state;
        const { store } = this.props;

        if(prevProps.store.storemenu !== store.storemenu) {
			if(store.storemenu.isLoaded) {

				this.setState({
					...this.state,
                    // storeMenuList: activeList
                    storeMenuList: store.storemenu.data.data.result.menu
				}, () => {
                    console.log(this.state.storeMenuList);
                })
            }
        };
    };

    handleSelectMenu = (menu) => {
		const { selectedMenuList } = this.state;

		if(!menu.selected) {
			// menu.selected = true;
			this.setState({
				...this.state,
				selectedMenuList: [menu]
				// selectedMenuList: selectedMenuList.concat([menu])
			}, () => {
				console.log(this.state.selectedMenuList);
			})
		}
		else {
			// menu.selected = false;
			this.setState({
				...this.state,
				selectedMenuList: selectedMenuList.filter(item => item != menu)
			})
		}
	}

    
    render() {
        return (
            <div>
                <ElementCardCustomerView 
                    handleSelectMenu = {this.handleSelectMenu}
                    {...this.state} 
                    {...this.props} />
            </div>
        )
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ElementCardCustomer);