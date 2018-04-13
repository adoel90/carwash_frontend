import React, {Component } from 'react';
import { PropsRoute } from '../../../components/Route';

import { Nav, NavItem, NavLink, NavTabLink} from '../../../components/Nav';
import { TabContent } from '../../../components/Tab';
import { AdminStoreCashierReportView } from '../AdminStoreCashierReport';

class AdminStoreCashierReport extends Component {

    constructor(){
        super();
        this.toggleTab = this.toggleTab.bind(this);

        this.state = {
            tabReport : [
                {id : 1, tabName: "Top-Up Daily" },
                {id : 2, tabName: "Kartu-Baru Daily"},
                
            ],

            activeTab: 0
        }
    }

    //#
    toggleTab = (tabIndex, tab) => {

        this.setState({
            activeTab: tabIndex
        })
    }

    render () { 
        const { tabReport, activeTab } = this.state;
   
        const renderTabContent = () => {

            return tabReport.map((tab) => {
                return (
                    <TabContent activeTab={activeTab} tabIndex={tab.id}>            
                        <PropsRoute
                            component={AdminStoreCashierReportView}
                            {...this.props}
                            {...this.state}
                        />
                    </TabContent>
                )
            })
        }


        return(
            <div>
                <Nav tabs className="flex justify-content--space-between">
                    {tabReport.map((tab) => (
                        <NavItem>   
                            <NavTabLink active={activeTab === tab.id} onClick = { () => this.toggleTab(tab.id, tab)} >
                                <h4>{tab.tabName}</h4>
                            </NavTabLink>
                        </NavItem>

                    )) }
                </Nav>
                
                {/* RENDER CONTENT BASED ON ID STORE */}
                {renderTabContent()}

                {/* <AdminStoreCashierReportView 
                    {...this.props}
                    {...this.state}
                /> */}
            </div>
        )   
    }
}

export default AdminStoreCashierReport;