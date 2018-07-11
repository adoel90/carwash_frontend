import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { PropsRoute } from '../../../components/Route';
import { TabContent } from '../../../components/Tab';
import { Nav, NavItem, NavLink, NavTabLink } from '../../../components/Nav';
import { Button } from '../../../components/Button';

import { AdminStoreCashierStockKartuView } from '../AdminStoreCashierStockKartu';

import { getStoreList } from '../../../actions/store.action';
import { getStockListNewCard } from '../../../actions/card.action';
// import { featureRemoveMember } from '../../../actions/store.action';

function mapStateToProps(state) {
    return {
        vendorState: state.vendorState,
        card: state.card
    };
};

function mapDispatchToProps(dispatch) {
    return {
        // featureRemoveMemberDispatch : () => dispatch(featureRemoveMember()),
        getStoreListDispatch: () => dispatch(getStoreList()),
        getStockListNewCardDispatch: (data) => dispatch(getStockListNewCard(data))
    }
};

class AdminStoreCashierStockKartu extends Component {

    constructor() {
        super();
        this.populateTableData = this.populateTableData.bind(this);
        this.handleCopyNumberCard = this.handleCopyNumberCard.bind(this);
        // this.handleCetakCardNumber = this.handleCetakCardNumber.bind(this);
        this.handleCopyNumberTaxiOnline = this.handleCopyNumberTaxiOnline.bind(this);
        this.handleCopyNumberNonMember = this.handleCopyNumberNonMember.bind(this);
        this.handleCopyNumberMember = this.handleCopyNumberMember.bind(this);

        this.state = {
            activeTab: 0,
            storeIdTab: {},
            storeNameTab: {},
            cardType: [
                { id: 3, name: "Taxi Online", status: true },
                { id: 2, name: "Non Member", status: true },
                { id: 1, name: "Member", status: true }
            ],
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            selectedRow: {},
            copiedTaxiOnline: false,
            copiedNonMember: false,
            copiedMember: false,
            listStockNewCard: {},
            cardTaxiOnline: '',
            cardNonMember: '',
            cardMember: ''
        };
    };

    componentDidMount() {

        const { getStoreListDispatch, getStockListNewCardDispatch } = this.props;
        // getStoreListDispatch();

        let requireDataTaxiOnline = { id: 3 };  //Taxi-Online 3
        getStockListNewCardDispatch(requireDataTaxiOnline);

        let requireDataNonMember = { id: 2 };  //Non-Member : 2
        getStockListNewCardDispatch(requireDataNonMember);

        let requireDataMember = { id: 1 }; //Member : 1
        getStockListNewCardDispatch(requireDataMember);
    };

    componentDidUpdate(prevProps) {

        const { card } = this.props;
        const { cardTaxiOnline, cardMember, cardNonMember } = this.state;

        if (prevProps.card.list != card.list) {
            if (card.list.isCreated) {

                if (card.list.data.result[0].ct_id === 3) { //Taxi-Online 3

                    this.setState({
                        ...this.state,
                        cardTaxiOnline: card.list.data.result[0].c_id
                    }, () => {
                        console.log(this.state.cardTaxiOnline);
                    });

                } else if (card.list.data.result[0].ct_id === 2) { //Non-Member : 2

                    this.setState({
                        ...this.state,
                        cardNonMember: card.list.data.result[0].c_id
                    }, () => {
                        console.log(this.state.cardNonMember);
                    });
                } else { //Member : 1

                    this.setState({
                        ...this.state,
                        cardMember: card.list.data.result[0].c_id
                    }, () => {
                        console.log(this.state.cardMember);
                    });
                };
            };
        };
    };

    //#
    handleCopyNumberCard = (row) => {
        console.log(row.number);
        console.log("Fire API delete ");
    };

    //#
    handleCopyNumberTaxiOnline = () => {

        this.setState({
            copiedTaxiOnline: true
        });
    };

    //#
    handleCopyNumberNonMember = () => {
        this.setState({
            copiedNonMember: true
        });
    };

    //#
    handleCopyNumberMember = () => {

        this.setState({
            copiedMember: true
        });
    };

    //#
    populateTableData = () => {

        const { report, vendorState, card } = this.props;
        const { copied } = this.state;

        const columns = [{
            title: 'Nomor Kartu',
            accessor: 'number',
            align: 'left'
        },
        {
            title: 'Aksi',
            accessor: 'action',
            // // render: (data) => (
            // render: (row) => (
            //     <td>
            //          <CopyToClipboard onCopy={this.onCopy} text={row.number}>
            //             <Button className="margin-right-small" theme={row.number ? "success" : "danger"} type="button" onClick={() => this.handleCopyNumberCard(row)}>{ row.number ? 'Copy Nomor Kartu' : 'Copied' }</Button>
            //         </CopyToClipboard>
            //     </td>
            // )
        }];

        const rows = [];

        if (card.list.isCreated) {
            card.list.data.result.forEach((value) => {
                let row = {
                    number: value.c_id
                };
                rows.push(row);
            });
        };

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

        return (
            <div>
                <AdminStoreCashierStockKartuView
                    handleCopyNumberTaxiOnline={this.handleCopyNumberTaxiOnline}
                    handleCopyNumberNonMember = {this.handleCopyNumberNonMember}
                    handleCopyNumberMember = {this.handleCopyNumberMember}
                    {...this.state}
                    {...this.props}
                />
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreCashierStockKartu);