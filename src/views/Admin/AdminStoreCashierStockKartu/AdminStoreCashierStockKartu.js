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
        this.toggleModal = this.toggleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModalGenerateNumber = this.openModalGenerateNumber.bind(this);
        this.handleCopyDataCard = this.handleCopyDataCard.bind(this);

        this.state = {
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
            isModalOpen: {
                modalGenerateNumber: false
            },
            selectedRow: {},
            listStockNewCard: {},
            idTaxiOnline:3,
            idNonMember:2,
            idMember: 1,
            dataCard:''
        };
    };

    componentDidMount() {
       
    };

    componentDidUpdate(prevProps) {

        const { card } = this.props;
        const { cardTaxiOnline, cardMember, cardNonMember } = this.state;

        if(prevProps.card.list != card.list){
            if(card.list.isCreated){
                this.setState({
                    ...this.state,
                    dataCard: card.list.data.result[0].c_id
                },() => {
                    console.log(this.state.dataCard);
                });
            };
        };
    };

    toggleModal = (name) => {

        const { isModalOpen } = this.state;
        this.setState({
            ...this.state,
            isModalOpen: {
                [name]: !isModalOpen[name]
            }
        });
    };

    closeModal = (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            isModalOpen: {
                modalGenerateNumber: false
            }
        });
    };

    //#
    // handleCopyNumberTaxiOnline = () => {

    //     this.setState({
    //         copiedTaxiOnline: true
    //     });
    // };


    handleCopyDataCard = () => {
        console.log("copied");
    };

    openModalGenerateNumber = (e, data) => {
        e.preventDefault();
        const { getStockListNewCardDispatch } = this.props;

        let requireData = { id: data };
        console.log(requireData);
        getStockListNewCardDispatch(requireData);

        this.toggleModal('modalGenerateNumber');
    }

    render() {
        const { cardType, activeTab } = this.state;
        const { vendorState } = this.props;

        return (
            <div>
                <AdminStoreCashierStockKartuView
                    toggleModal={this.toggleModal}
                    closeModal = {this.closeModal}
                    openModalGenerateNumber = {this.openModalGenerateNumber}
                    handleCopyDataCard = {this.handleCopyDataCard}
                    {...this.state}
                    {...this.props}
                />
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminStoreCashierStockKartu);