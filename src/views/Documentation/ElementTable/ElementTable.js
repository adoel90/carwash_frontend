import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from '../../../components/Button';

import { getAllCardType } from '../../../actions/card.action';

import { ElementTableView } from '../ElementTable';


const mapStateToProps = (state) => {
    return {
          card: state.card,
          dialog: state.dialog,
          storeState: state.store,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
          getAllCardTypeDispatch : (data) => dispatch(getAllCardType(data)),
        //   getSaldoBonusDispatch : () => dispatch(getSaldoBonus()),
        //   getAllCardType: () => dispatch(getAllCardType()),
        //   action: bindActionCreators({ updateCardType, changeCardTypeStatus, openDialog, closeDialog, getBonusTaxiOnline }, dispatch)
    }
}



class ElementTable extends Component {

    constructor(){
        
        super();
        this.populateTableData = this.populateTableData.bind(this);

        this.state = {
            card: {},
            cardList: {},
            search: {
                  searchText: '',
                  searchBy: 'name'
            },
            table: {
                  columns: [],
                  rows: [],
                  limit: 10,
                  searchParams: [
                        { accessor: 'name', name: 'Nama Kartu' }
                  ]
            },
            isModalOpen: {
                  updateCard: false
            },
            bonus: {},
            selectedCard:{}            
      };


    };

    componentDidMount(){
        const { getAllCardTypeDispatch} = this.props;
    
        let requireData = {
              limit: 3
        };
        getAllCardTypeDispatch(requireData);
    };

    componentDidUpdate = (prevProps) => {
        const { card, storeState } = this.props;    
        const { cardList } = this.state;

        if(prevProps.card.types !== card.types) {
              this.setState({
                    ...this.state,
                    cardList: card.types
              }, () => {
                    this.populateTableData();
              })
        }
    }




    populateTableData = () => {
        const { cardList } = this.state;

        const { card } = this.props;

        const columns = [{
              title: 'Nama',
              accessor: 'name'
        }, 
        {
              title: 'Status',
              accessor: 'action',
              width: '30%',
              align: 'center',
              render: (row) => (
                    <td className="flex justify-content--center">
                          <Button className="margin-right-small" type="button">Setting Kartu</Button>
                          <Button type="button" theme="success">Aktif</Button>
                    </td>
              )
        }];

        const rows = [];

        // if(cardList.isLoaded) {
        if(card.types.isLoaded){
              card.types.data.result.card.forEach((data) => {

                    let row = {
                          id: data.id,
                          name: data.name,
                          min: data.min,
                          // mintopup: data.mintopup,
                          bonus: data.bonus,
                          refund: data.refund,
                          charge: data.charge,
                          data: data
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
        return (
            <div>
                <ElementTableView {...this.state} {...this.props} />
            </div>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ElementTable);