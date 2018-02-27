import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminVendorView } from '../AdminVendor';
import { getAdminVendorList } from '../../../actions/admin.vendor.action';

function mapStateToProps(state) {
    
    return {
        adminVendorState : state.adminVendorState
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getAdminVendorDispatch: () => dispatch(getAdminVendorList())
    }
}

class AdminVendor extends Component {

    constructor(){

        super();

        this.getAdminVendorList - this.getAdminVendorList.bind();
        this.openAdminVendorDetail - this.openAdminVendorDetail.bind();
        this.toggleModal - this.toggleModal.bind();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateAdminVendor = this.updateAdminVendor.bind(this);
        this.populateTableData = this.populateTableData.bind(this);
    
        this.state = {

            adminVendor: {},
            adminVendorList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            isModalOpen:{
                updateAdminVendor: false
            }
        }
    }

    componentDidMount = () => {

        this.getAdminVendorList();
    }

    getAdminVendorList(){

        const{getAdminVendorDispatch } = this.props;
        getAdminVendorDispatch();
    }

    componentDidUpdate = (prevProps) => {

        const { adminVendorState } = this.props;
        
        if(prevProps.adminVendorState.list !== adminVendorState.list) {

            this.setState({

                ...this.state,
                adminVendorList: adminVendorState.list

            }, () => {
                this.populateTableData();
            });
        }
    }

    populateTableData = () => {

        const { adminVendorList } = this.state;   
         
        const columns = [{

            title: 'ID',
            accessor: 'id'
        }, {
            title: 'Nama Vendor',
            accessor: 'name'
        },
        
        {
            title: 'Aksi',
            accessor: 'action',
            // render: (data) => (
            render: (row) => (
                <td>
                    <a href="#" onClick={() => this.openAdminVendorDetail(row)}>Ubah</a>
                </td>
            )
        }]

        const rows = [] 
        
        if(adminVendorList.isLoaded) {
              
            adminVendorList.data.data.result.forEach((admin, i) => {

                let row = {
                    id: admin.id,
                    name: admin.name,
                    data: admin
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

    openAdminVendorDetail = (row) => {

        this.setState({
            ...this.state,
            selectedAdminVendor : row.data
        }, () => {
            this.toggleModal('updateAdminVendor')
        })
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

    updateAdminVendor = () => {

    }
    
    render() {
        return (
            <AdminVendorView
                {...this.state}
                {...this.props}
                toggleModal= {this.toggleModal}
                handleInputChange= {this.handleInputChange}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,

)(AdminVendor);