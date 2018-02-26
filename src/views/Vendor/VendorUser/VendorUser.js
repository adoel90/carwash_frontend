import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { VendorUserView } from '../VendorUser';
import { getVendorUserList } from '../../../actions/vendor.action';
// import { Button } from '../../../components/Button';

function mapStateToProps(state) {
    
    return {

        vendor: state.vendor
    };
}

function mapDispatchToProps(dispatch) {

    return {
        getVendorUserList: () => dispatch(getVendorUserList())
    }
}

class VendorUser extends Component {
    
    constructor() {
        super();
        this.getVendorUserList = this.getVendorUserList.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        
        this.openVendorDetail = this.openVendorDetail.bind(this);
        this.updateVendor = this.updateVendor.bind(this);
        this.populateTableData = this.populateTableData.bind(this);

        this.state = {

            vendor: {},
            vendorList: {},
            table: {
                columns: [],
                rows: [],
                limit: 10
            },
            isModalOpen:{
                updateVendor: false
            }
        }
    }

    componentDidMount = () => {

        this.getVendorUserList();
    }

    componentDidUpdate = (prevProps) => {
        const {
            vendor
        } = this.props;
        
        
       
        if(prevProps.vendor.list !== vendor.list) {

            this.setState({

                ...this.state,
                vendorList: vendor.list

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

    // handleChangeUser = (data) => {
    //     console.log(data);
    // }

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

    openVendorDetail = (row) => {

        this.setState({
            ...this.state,
            selectedVendor : row.data
        }, () => {
            this.toggleModal('updateVendor')
        })
    }

    updateVendor = () => {

    }

    populateTableData = () => {

        const { vendorList } = this.state;   
         
        const columns = [{

            title: 'ID',
            accessor: 'id'
        }, {
            title: 'Nama User',
            accessor: 'name'
        },
        
        {
            title: 'Aksi',
            accessor: 'action',
            // render: (data) => (
            render: (row) => (
                <td>
                    <a href="#" onClick={() => this.openVendorDetail(row)}>Ubah</a>
                </td>
            )
        }]

        const rows = [] 
        
        if(vendorList.isLoaded) {
              
            vendorList.data.data.result.forEach((vendor, i) => {

                let row = {
                    id: vendor.id,
                    name: vendor.name,
                    data: vendor
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

        console.log("this.state ---> " + this.state);   
    }

    getVendorUserList = () => {

        const {
            getVendorUserList
        } = this.props;

        getVendorUserList();
    }
    
    render() {
        console.log(this.props)
        
        return (
            <VendorUserView
                {...this.state}
                {...this.props}
                handleInputChange= {this.handleInputChange}
                toggleModal= {this.toggleModal}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorUser);