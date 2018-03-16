import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AdminUserView } from '../AdminUser';
import { getUserList, updateUser, changeStatusUser } from '../../../actions/user.action';
import { getAccessList } from '../../../actions/access.action';
import { Button } from '../../../components/Button';

class AdminUser extends Component {
    
    constructor() {
        super();
        this.getUserList = this.getUserList.bind(this);
        this.getAccessList = this.getAccessList.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.openUserDetail = this.openUserDetail.bind(this);
        this.changeStatusUser = this.changeStatusUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.state = {
            user: {},
            userList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            isModalOpen: {
                updateUser: false
            }
        }
    }

    componentDidMount = () => {
        this.getUserList();
        this.getAccessList();
    }

    componentDidUpdate = (prevProps) => {
        const {
            user
        } = this.props;

        const {
            userList
        } = this.state;
        
        if(prevProps.user.list !== user.list) {
            this.setState({
                ...this.state,
                userList: user.list
            }, () => {
                this.populateTableData();
            });
        }

        if(prevProps.user.status !== user.status) {
            if(user.status.isStatusChanging) {
                userList.data.data.result.map((item) => {
                    if(item.id === user.status.id) {
                        item.statusChanging = true;
                        this.forceUpdate();
                    }
                })
            }

            if(user.status.isStatusChanged) {
                userList.data.data.result.forEach((item) => {
                    if(item.id === user.status.id) {
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

    openUserDetail = (row) => {
        this.setState({
            ...this.state,
            selectedUser: row.data
        }, () => {
            this.toggleModal('updateUser');
        })
    }

    changeStatusUser = (row) => {
        const {
            action
        } = this.props;

        let requiredData = {
            id: row.data.id
        }

        action.changeStatusUser(requiredData);
    }

    updateUser = (e) => {
        const {
            action
        } = this.props;

        let {
            selectedUser
        } = this.state;

        e.preventDefault();

        action.updateUser(selectedUser).then(() => {
            this.toggleModal('updateUser');
            
            window.location.reload();
        })
    }

    populateTableData = () => {
        const { userList } = this.state;
        
        const columns = [{
            title: 'Nama User',
            accessor: 'name'
        }, {
            title: 'Alamat Email',
            accessor: 'email'
        }, {
            title: 'Level Akses',
            accessor: 'accessLevel',
            align: 'center'
        }, {
            title: 'Aksi',
            accessor: 'action',
            width: '30%',
            align: 'center',
            render: (row) => (
                <td className="flex justify-content--center">
                    <Button className="margin-right-small" type="button" onClick={() => this.openUserDetail(row)}>Ubah</Button>
                    <Button type="button" theme={row.data.status ? "success" : "danger"} onClick={() => this.changeStatusUser(row)}>{ row.data.status ? 'Aktif' : 'Non Aktif' }</Button>
                </td>
            )
        }]

        const rows = [] 
        
        if(userList.isLoaded) {
            userList.data.data.result.forEach((user, i) => {
                let row = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    accessLevel: user.level.name,
                    data: user
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
        })
    }

    getUserList = () => {
        const {
            getUserList
        } = this.props;

        getUserList();
    }

    getAccessList = () => {
        const {
            getAccessList
        } = this.props;

        getAccessList();
    }
    
    render() {
        return (
            <AdminUserView
                {...this.state}
                {...this.props}
                handleInputChange={this.handleInputChange}
                updateUser={this.updateUser}
                toggleModal={this.toggleModal}
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        access: state.access
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserList: () => dispatch(getUserList()),
        getAccessList: () => dispatch(getAccessList()),
        action: bindActionCreators({ updateUser, changeStatusUser }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUser);