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
        this.populateTableData = this.populateTableData.bind(this);
        this.handleCopyNumberCard = this.handleCopyNumberCard.bind(this);

        this.state = {
            activeTab: 0,
            storeIdTab: {},
            cardType : [
                { id : 1, name: "Taxi Online", status: true },
                { id : 2, name: "Non Member", status: true },
                { id : 3, name: "Member", status: true }
            ],

            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            selectedRow: {},
            copied: false,
        }
    };

    componentDidMount(){
        const {getStoreListDispatch} = this.props;
        getStoreListDispatch();
        this.populateTableData();
    }

    //#
    handleCopyNumberCard = (row) => {
        console.log(row.number);
    };

    //#
    onCopy = () => {
        this.setState({
            copied: true
        });
    };

    //#
    toggleTab = (tabIndex, data) => {

        this.setState({
            activeTab: tabIndex
            // storeIdTab: data
        });
    };

    //#
    populateTableData = () => {

        const {report, vendorState} = this.props;
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
        }
    ];

        const rows = [];
        
        // let row = {
        //     number : "35454254235423"
        // };
        
        if(vendorState.store.isLoaded){
            vendorState.store.data.data.result.store.forEach((value) => {

                let row = {
                    number: value.user.id
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