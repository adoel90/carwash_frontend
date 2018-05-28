import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PropsRoute } from '../../../components/Route';
import { TabContent } from '../../../components/Tab';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { AdminStoreCashierStockKartuView } from '../AdminStoreCashierStockKartu';

import { getStoreList } from '../../../actions/store.action';

function mapStateToProps(state) {
    return {
        vendorState: state.vendorState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
    }
}

class AdminStoreCashierStockKartu extends Component {


    constructor(){
        super();
        this.toggleTab = this.toggleTab.bind(this);

        this.state = {
            activeTab: 0,
            storeIdTab: {},
            cardType : [
                { id : 1, name: "Taxi Online", status: true },
                { id : 2, name: "Non Member", status: true },
                { id : 3, name: "Member", status: true }
            ],

        }
    };

    componentDidMount(){
        // const {getStoreListDispatch} = this.props;
        // getStoreListDispatch();
    }

    //#
    toggleTab = (tabIndex, data) => {

        this.setState({
            activeTab: tabIndex
            // storeIdTab: data
        })
    }

    render() {

        const { cardType, activeTab } = this.state;
        const { vendorState } = this.props;

        const renderTabContent = () => {

            return cardType.map((card, i) => {
                return (
                    <TabContent activeTab={activeTab} tabIndex={i}>  
                        

                        <PropsRoute
                            component={AdminStoreCashierStockKartuView}
                            type={card}
                            {...this.props}
                            {...this.state}
                
                            toggleTab={this.toggleTab}
                        />
                    </TabContent>
                )
            })
          
        }

        return (
            
            <div>
                 <Nav tabs className="flex justify-content--space-between" >
                    { cardType.map((card, i) => {
                        return (
                            <NavItem>
                                <NavTabLink active={activeTab === i} onClick={() => this.toggleTab(i, card)}>
                                    <h5>{card.name}</h5>
                                </NavTabLink>
                            </NavItem>
                        )
                    })}
                 </Nav>
                

                {/* RENDER CONTENT BASED ON ID STORE */}
                {renderTabContent()}
            </div>
        )
    }
}


export default connect( mapStateToProps, mapDispatchToProps )(AdminStoreCashierStockKartu);