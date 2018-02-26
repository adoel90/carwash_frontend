import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminUserView } from '../AdminUser';
import { getUserList } from '../../../actions/user.action';

function mapStateToProps(state) {
    
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserList: () => dispatch(getUserList())
    }
}

class AdminUser extends Component {
    
    constructor() {
        super();
        this.getUserList = this.getUserList.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.openUserDetail = this.openUserDetail.bind(this);
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
    }

    componentDidUpdate = (prevProps) => {
        const {
            user
        } = this.props;
        
        if(prevProps.user.list !== user.list) {
            this.setState({
                ...this.state,
                userList: user.list
            }, () => {
                this.populateTableData();
            });
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

    updateUser = () => {

    }

    populateTableData = () => {
        const { userList } = this.state;
        
        const columns = [{
            title: 'ID',
            accessor: 'id'
        }, {
            title: 'Nama User',
            accessor: 'name'
        }, {
            title: 'Alamat Email',
            accessor: 'email'
        }, {
            title: 'Level Akses',
            accessor: 'accessLevel'
        }, {
            title: 'Aksi',
            accessor: 'action',
            render: (row) => (
                <td>
                    <a href="#" onClick={() => this.openUserDetail(row)}>Ubah</a>
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
    
    render() {
        return (
            <AdminUserView
                {...this.state}
                {...this.props}
                handleInputChange={this.handleInputChange}
                toggleModal={this.toggleModal}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUser);