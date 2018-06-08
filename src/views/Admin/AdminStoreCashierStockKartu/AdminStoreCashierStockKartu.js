import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { PropsRoute } from '../../../components/Route';
import { TabContent } from '../../../components/Tab';
import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { Button } from '../../../components/Button';

import { AdminStoreCashierStockKartuView } from '../AdminStoreCashierStockKartu';

import { getStoreList } from '../../../actions/store.action';
import { createStockListNewCard } from '../../../actions/card.action';

function mapStateToProps(state) {
    return {
        vendorState: state.vendorState,
        card : state.card
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        createStockListNewCardDispatch : (data) => dispatch(createStockListNewCard(data))
    }
};

class AdminStoreCashierStockKartu extends Component {

    constructor(){
        super();
        this.toggleTab = this.toggleTab.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.handleCopyNumberCard = this.handleCopyNumberCard.bind(this);
        this.handleCetakCardNumber = this.handleCetakCardNumber.bind(this);

        this.state = {
            activeTab: 0,
            storeIdTab: {},
            cardType : [
                { id : 3, name: "Taxi Online", status: true },
                { id : 2, name: "Non Member", status: true },
                { id : 1, name: "Member", status: true }
            ],

            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            selectedRow: {},
            copied: false,
            listStockNewCard: {}
        }
    };

    componentDidMount(){

        //#
        const {getStoreListDispatch} = this.props;
        getStoreListDispatch();

        //#
        this.setState({
            activeTab: 1
        }, () => {
            let requireData = {
                id: this.state.activeTab + 1 // ==> Type "Non-Member"
            }

            const { createStockListNewCardDispatch } = this.props;
            createStockListNewCardDispatch(requireData);
        });
    };

    componentDidUpdate(prevProps){

        const { card } = this.props;

        if(prevProps.card.list != card.list){
            if(card.list.isCreated){
                this.setState({
                    ...this.state,
                    listStockNewCard: card.list.data.result
                },() => {
                  
                  this.populateTableData();
                })
            }
        }   
    }

    //#
    handleCopyNumberCard = (row) => {
        console.log(row.number);
        console.log("Fire API delete ");
    };

    //#
    onCopy = () => {
        this.setState({
            copied: true
        });
    };

    //#
    toggleTab = (tabIndex, data) => {

        //#
        let requireData = {
            id: data.id
        };

        const { createStockListNewCardDispatch } = this.props;
        createStockListNewCardDispatch(requireData);
        
        //#
        this.setState({
            activeTab: tabIndex
        });
    };

    //#
    populateTableData = () => {

        const {report, vendorState, card} = this.props;
        // const { dailyOrdered } = this.state;
        
        const columns = [{
            title: 'Nomor Kartu',
            accessor: 'number',
            align: 'left'
        },
        {
            title: 'Aksi',
            accessor: 'action',
            // render: (data) => (
            render: (row) => (
                <td>

                     <CopyToClipboard onCopy={this.onCopy} text={row.number}>
                        <Button className="margin-right-small" type="button" onClick={() => this.handleCopyNumberCard(row)}>Copy Nomor Kartu</Button>
                    </CopyToClipboard>
                   
                </td>
            )
        }];

        const rows = [];

        if(card.list.isCreated){
            card.list.data.result.forEach((value) => {

                let row = {
                    number: value.c_id
                };
                rows.push(row);
            });
        }

        this.setState({
            ...this.state,
            table: {
                ...this.state.table,
                columns: columns,
                rows: rows
            }
        });
    };

    //#
    handleCetakCardNumber = (e) => {

        e.preventDefault();

        const { activeTab, tabIndex } = this.state;
        const { createStockListNewCardDispatch } = this.props;

        // if(activeTab === 0){
        
        //     let requireData = { id: 3 };  //Taxi-Online 3
        //     createStockListNewCardDispatch(requireData);
            
        // } else if(activeTab === 1){

        //     let requireData = { id: 2 };  //Non-Member : 2
        //     createStockListNewCardDispatch(requireData);

        // } else {
        //     let requireData = { id: 1 }; //Member : 1
        //     createStockListNewCardDispatch(requireData);
        // }
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
                            handleCetakCardNumber = {this.handleCetakCardNumber}
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