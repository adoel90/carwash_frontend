import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from '../../../components/Button';
import { ModalDialog } from '../../../components/Modal';
import AdminMemberView from './AdminMemberView';
import moment from 'moment';

import { getAllMemberList, updateMember, changeMemberStatus, getMemberDetailHistoris } from '../../../actions/member.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { getReportMemberExportToExcell } from '../../../actions/report.action';


class AdminMember extends Component {
      constructor() {
            super();
            this.state = {
                  member: {},
                  memberList: {},
                  search: {
                        searchText: '',
                        searchBy: 'name'
                  },
                  table: {
                        columns: [],
                        rows: [],
                        limit: 10,
                        searchParams: [
                              { accessor: 'name', name: 'Nama Member' },
                              { accessor: 'email', name: 'Email' },
                              { accessor: 'cardType', name: 'Tipe Member' },
                        ]
                  },
                  period: {
                        from: moment().add(-12, 'month'),
                        to: moment()
                  },
                  isModalOpen: {
                        updateMember: false,
                        detailMember: false
                  },
                  selectedMemberDetail: {},
                  selectedMember:{},
                  listMemberTransactionHistoris: {}
            }

            this.getMemberList = this.getMemberList.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.renderDialog = this.renderDialog.bind(this);
            this.handleInputChange = this.handleInputChange.bind(this);
            this.openMemberDetail = this.openMemberDetail.bind(this);
            this.changeMemberStatus = this.changeMemberStatus.bind(this);
            this.updateMember = this.updateMember.bind(this);
            this.populateTableData = this.populateTableData.bind(this);

            this.openMemberModalDetailNew = this.openMemberModalDetailNew.bind(this);
            this.handleExportToExcell = this.handleExportToExcell.bind(this);
      }
      
      componentDidMount = () => {
            this.getMemberList();
      }

      componentDidUpdate = (prevProps) => {
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

            //Get Detail Member Historis
            if(prevProps.member.memberHistoris !== member.memberHistoris){
                  if(member.memberHistoris.isLoaded){
                        this.setState({
                              ...this.state,
                              listMemberTransactionHistoris: member.memberHistoris.data.data.result
                        },() => {
                              console.log(this.state);
                        } );

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

      toggleDialog = (data) => {
            const {
                dialog,
                action
            } = this.props;
    
            if(!dialog.isOpened) {
                action.openDialog(data);
            } else {
                action.closeDialog();
            }
      }

      renderDialog = () => {
            const {
                dialog,
                toggleDialog
            } = this.props;
            
            return (
                <ModalDialog
                    isOpen={dialog.isOpened}
                    toggle={toggleDialog}
                    type={dialog.data.type}
                    title={dialog.data.title}
                    message={dialog.data.message}
                    onConfirm={dialog.data.onConfirm}
                    confirmText={dialog.data.confirmText}
                    onClose={dialog.data.onClose}
                    closeText={dialog.data.closeText}
                />
            )
      }

      //#
      openMemberModalDetailNew = (row) => {
            // console.log(row);
            this.setState({
                  ...this.state,
                  selectedMemberDetail: row
            }, () => {
                  const { selectedMemberDetail } = this.state;
                  const { action } = this.props;
                  
                  let data = {
                        id: selectedMemberDetail.id,
                        transaction: selectedMemberDetail.data.status
                  }
                  action.getMemberDetailHistoris(data);
                  this.toggleModal('detailMember');
            });
            
      }
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
                  rowAlign: 'center'
            }, {
                  title: 'Status',
                  accessor: 'action',
                  width: '30%',
                  align: 'center',
                  render: (row) => (
                        <td className="flex justify-content--center">
                              <Button className="margin-right-small" theme="light" type="button" onClick={() => this.openMemberModalDetailNew(row)}>Detail</Button>                              
                              <Button className="margin-right-small" type="button" onClick={() => this.openMemberDetail(row)}>Ubah</Button>
                              <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changdeMemberStatus(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
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
                              cardNumber: member.card.id,
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
                  // console.log(this.state)
            })
      }

      openMemberDetail = (row) => {
            
            this.setState({
                  ...this.state,
                  selectedMember: row.data
            }, () => {
                  console.log(this.state);
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
                  const {
                        member
                  } = this.props;

                  if (member.item.isUpdated) {
                        let dialogData = {
                            type: 'success',
                            title: 'Berhasil',
                            message: 'Member telah berhasil diubah. Klik tombol berikut untuk kembali.',
                            onClose: () => window.location.reload(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
      
                  if (member.item.isError) {
                        let dialogData = {
                            type: 'danger',
                            title: 'Gagal',
                            message: 'Member gagal diubah. Klik tombol berikut untuk kembali.',
                            onClose: () => this.toggleDialog(),
                            closeText: 'Kembali'
                        }
                
                        this.toggleDialog(dialogData);
                  }
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

      
      //#
      handleExportToExcell = (e, period) => {
            e.preventDefault();
            const { getReportMemberExportToExcellDispatch } = this.props;

            let requiredData = {
                  start_date : moment(period.from).format('YYYY-MM-DD'),
                  // end_date : moment(period.to).format('YYYY-MM-DD'), 
                  // start_date: moment(new Date()).format('YYYY-MM-DD'),
                  end_date: moment(new Date()).format('YYYY-MM-DD'),
                  convert: true
            }
            // console.log(requiredData);
            getReportMemberExportToExcellDispatch(requiredData);
      }

      render() {
            return (
                  <div>
                        <AdminMemberView 
                              {...this.state}
                              {...this.props}
                              handleInputChange={this.handleInputChange}
                              updateMember={this.updateMember}
                              toggleModal={this.toggleModal}
                              handleExportToExcell={this.handleExportToExcell}
                        />
                        {this.renderDialog()}
                  </div>
            )
      }
}

function mapStateToProps(state) {
      return {
          member: state.member,
          dialog: state.dialog
      };
}
  
function mapDispatchToProps(dispatch) {
      return {
          getAllMemberList: () => dispatch(getAllMemberList()),
          getReportMemberExportToExcellDispatch: (data) => dispatch(getReportMemberExportToExcell(data)),
          action: bindActionCreators({ getMemberDetailHistoris, updateMember, changeMemberStatus, openDialog, closeDialog }, dispatch)
      }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMember);