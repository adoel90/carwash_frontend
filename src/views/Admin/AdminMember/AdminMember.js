import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllMemberList, updateMember, changeMemberStatus } from '../../../actions/member.action';
import { Button } from '../../../components/Button';

import AdminMemberView from './AdminMemberView';

class AdminMember extends Component {
      constructor() {
            super();
            this.state = {
                  member: {},
                  memberList: {},
                  table: {
                        columns: [],
                        rows: [],
                        limit: 10
                  },
                  isModalOpen: {
                        updateMember: false
                  }
            }

            this.getMemberList = this.getMemberList.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.openMemberDetail = this.openMemberDetail.bind(this);
            this.changeMemberStatus = this.changeMemberStatus.bind(this);
            this.updateMember = this.updateMember.bind(this);
            this.populateTableData = this.populateTableData.bind(this);
      }
      
      componentDidMount = () => {
            this.getMemberList();
      }

      componentDidUpdate = (prevProps) => {
            const {
                  member
            } = this.props;

            const {
                  memberList
            } = this.state;

            if(prevProps.member.list !== member.list) {
                  this.setState({
                        ...this.state,
                        memberList: member.list
                  }, () => {
                        this.populateTableData();
                  })
            }

            if(prevProps.member.item !== member.item) {
                  if(member.item.isStatusChanging) {
                        memberList.data.result.map((item) => {
                              item.statusChanging = true;
                              this.forceUpdate();
                        })
                  }

                  if(member.item.isStatusChanged) {
                        memberList.data.result.map((item) => {
                              if (item.id === member.item.id) {
                                    item.statusChanging = false;

                                    if(item.status) {
                                          item.status = false;
                                    } 
                                    else {
                                          item.status = true;
                                    }

                                    this.forceUpdate();
                              }
                        })
                  }
            }
      }

      toggleModal = (name) => {
            const { isModalOpen } = this.state;
            
            this.setState({
                  ...this.state,
                  isModalOpen: {
                        [name]: !isModalOpen[name]
                  }
            })
      }

      populateTableData = () => {
            const { memberList } = this.state;
            
            const columns = [{
                  title: 'Nama Member',
                  accessor: 'name'
            }, {
                  title: 'Email',
                  accessor: 'email'
            }, {
                  title: 'Tipe Member',
                  accessor: 'cardType',
                  rowAlign: 'center'
            }, {
                  title: 'Aksi',
                  accessor: 'action',
                  width: '30%',
                  align: 'center',
                  render: (row) => (
                        <td className="flex justify-content--center">
                              <Button className="margin-right-small" type="button" onClick={() => this.openMemberDetail(row)}>Ubah</Button>
                              <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changeMemberStatus(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
                        </td>
                  )
            }]
    
            const rows = [];

            if(memberList.isLoaded) {
                  memberList.data.result.forEach((member, i) => {
                        let row = {
                              id: member.id,
                              name: member.name,
                              email: member.email,
                              cardType: member.card.type.name,
                              phone: member.phone,
                              data: member
                        }
    
                        rows.push(row);
                  })
            }
    
            this.setState({
                  ...this.state,
                  table: {
                        ...this.state.table,
                        columns: columns,
                        rows: rows
                  }
            }, () => {
                  console.log(this.state)
            })
      }

      openMemberDetail = (row) => {
            this.setState({
                  ...this.state,
                  selectedMember: row.data
            }, () => {
                  this.toggleModal('updateMember');
            })
      }

      changeMemberStatus = (row) => {
            const {
                  action
            } = this.props;
    
            let requiredData = {
                  id: row.data.id
            }
    
            action.changeMemberStatus(requiredData);
      }

      updateMember = (e) => {
            const {
                  action
            } = this.props;
      
            let {
                  selectedMember
            } = this.state;
      
            e.preventDefault();
      
            action.updateMember(selectedMember).then(() => {
                  this.toggleModal('updateMember');
                  
                  window.location.reload();
            })
      }

      handleInputChange = (object, e) => {
            const target = e.target;
            const name = target.name;
            const value = target.value;
    
            this.setState({
                ...this.state,
                [object]: {
                    ...this.state[object],
                    [name]: value
                }
            });
      }

      getMemberList = () => {
            const {
                  getAllMemberList
            } = this.props;

            getAllMemberList();
      }

      render() {
            return (
                  <AdminMemberView 
                        {...this.state}
                        {...this.props}
                        handleInputChange={this.handleInputChange}
                        updateMember={this.updateMember}
                        toggleModal={this.toggleModal}
                  />
            )
      }
}

function mapStateToProps(state) {
      return {
          member: state.member
      };
}
  
function mapDispatchToProps(dispatch) {
      return {
          getAllMemberList: () => dispatch(getAllMemberList()),
          action: bindActionCreators({ updateMember, changeMemberStatus }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMember);