import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AdminUserView } from '../AdminUser';
import { getUserList } from '../../../actions/user.action';
import { Button } from '../../../components/Button';

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
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
        this.state = {
            user: {},
            userList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
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

    handleChangeUser = (data) => {
        console.log(data);
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
            render: (data) => (
                <td>
                    <a href="#" onClick={() => this.handleChangeUser(data)}>Ubah</a>
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
                    accessLevel: user.level.name
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
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUser);