import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllMemberList } from '../../../actions/member.action';

import { ElementTableReactBootstrapView } from '../ElementTableReactBootstrap';
import MySearchField from '../../../components/Input/MySearchField';

function mapStateToProps(state) {
    return {
        member: state.member
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllMemberListDispatch: () => dispatch(getAllMemberList()),
       
    }
};

class ElementTableReactBootstrap extends Component {

    constructor(){
        super();
        this.populateTableData = this.populateTableData.bind(this);
        
        this.optionsFeatureTable = {
            prePage:'Prev',
            nextPage:'Next',
            firstPage: '.', // First page button text
            lastPage: '.', // Last page button text
            sortIndicator: true,
            noDataText: 'Nama User tidak di temukan',
            searchField: (props) => (<MySearchField { ...props } name="Cari berdasarkan nama member, nomor kartu atau tipe member"/>),
            hideSizePerPage: true,
            searchPosition: 'left',
      };

        this.state = {
            memberList : {},
            table: {
                columns: [],
                rows: [],
                limit: 10,
          },
        }

    };

    componentDidMount(){
        const { getAllMemberListDispatch } = this.props;
        getAllMemberListDispatch();
    };

    componentDidUpdate(prevProps){

        const { member } = this.props;
        const { memberList } = this.state;

        if(prevProps.member.list !== member.list) {
              this.setState({
                    ...this.state,
                    memberList: member.list
              }, () => {
                    this.populateTableData();
              })
        }
    };

    populateTableData = () => {

        const { memberList } = this.state;
        
        const columns = [{
              title: 'Nama Member',
              accessor: 'name'
        }, {
              title: 'Nomor kartu',
              accessor: 'cardNumber'
        }, {
              title: 'Tipe Member',
              accessor: 'cardType',
              rowAlign: 'left'
        },{
              title: 'Status',
              accessor: 'action',
              width: '30%',
              // align: 'left',
              // render: (row) => (
              //       <td>
              //             {/* <Button className="margin-right-small" theme="light" type="button" onClick={() => this.openMemberModalDetailNew(row)}>Detail</Button>                               */}
              //             <Button className="margin-right-small" type="button" onClick={() => this.openMemberDetail(row)}>Ubah</Button>
              //             <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changeMemberStatus(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
              //       </td>
              // )
        }];

        const rows = [];

        if(memberList.isLoaded) {
              memberList.data.result.forEach((member, i) => {
                    let row = {
                          id: member.id,
                          name: member.name,
                          email: member.email,
                          cardType: member.card.type.name,
                          phone: member.phone,
                          cardNumber: member.card.id,
                          address:member.address,
                          data: member
                    }

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
    }
    
    render() {
        return (
            <div>
                <ElementTableReactBootstrapView 
                    optionsFeatureTable = {this.optionsFeatureTable}
                    {...this.state} 
                    {...this.props} />
            </div>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ElementTableReactBootstrap);