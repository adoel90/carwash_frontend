import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
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
            title: 'Aksi',
            accessor: 'action',
            render: (
                <span>
                    <a href="#">Ubah</a> — &nbsp;
                    <a href="#">Hapus</a>
                </span>
            )
        }]

        const rows = [] 
        
        if(userList.isLoaded) {
            userList.data.data.result.map((user, i) => {
                let row = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
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