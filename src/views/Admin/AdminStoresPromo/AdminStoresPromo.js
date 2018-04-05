import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { getStoreList } from '../../../actions/vendor.action';
import { getPromoDiscountListAllStore, updatePromo } from '../../../actions/store.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { AdminStoresPromoView } from '../AdminStoresPromo';
import { Dialog } from '../../../components/Dialog';
import { Button } from '../../../components/Button';

function mapStateToProps(state) {
    return {
        store : state.store,
        dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        getPromoDiscountListAllStoreDispatch: (data) => dispatch(getPromoDiscountListAllStore(data)),
        action: bindActionCreators({ updatePromo, openDialog, closeDialog }, dispatch)
    }
}

class AdminStoresPromo extends Component {

    constructor(){
        super();

        this.populateTableData = this.populateTableData.bind(this);
        this.openStoresPromoModal = this.openStoresPromoModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.renderDialog = this.renderDialog.bind(this);

        this.state = {

            storeList : {},
            promoList: {},
            storeActive: 0,

            period: {
        		from: moment().add(-1, 'month'),
        		to: moment()
            },  
            
            table: {
                columns: [],
                rows: [],
                limit: 10
            },

            isModalOpen: {
                updatePromo: false
            },
            selectedPromo : {},
            promoIsUpdated: false
        }
    }

    componentDidMount(){

        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();    
    }

    componentDidUpdate(prevProps){

        const { getPromoDiscountListAllStoreDispatch, store } = this.props;
        const { period, storeActive } = this.state;
        
        //Get Store List
        if(prevProps.store.list !== store.list) {
            if (store.list.isLoaded) {
            
                this.setState({
                    ...this.state,
                    storeList: store.list.data.data.result.store

                }, () => {

                    let requiredDataPromo = {
                        storeid : store.list.data.data.result.store[storeActive],
                        active: true
                    }

                    getPromoDiscountListAllStoreDispatch(requiredDataPromo);
                })
            }
        }

        //Get Discount list & Populate data
        if(prevProps.store.promo !== store.promo){
            if(store.promo.isLoaded){

                this.setState({
                    ...this.state,
                    promoList: store.promo
                }, () => {
                    console.log(this.state);
                    this.populateTableData();
                    
                })
            }
        }
    }

    populateTableData = () => {

        const { promoList } = this.state;

        const columns = [
            // {
            //     title: 'ID ',
            //     accessor: 'id'
            // },
            {
                title: 'Discount (%) ',
                accessor: 'price'
            },
            {
                title: 'Discount berakhir pada tanggal : ',
                accessor: 'date'
            },
            {
                title: 'Edit',
                accessor: 'action',
                render: (row) => (
                    <td>
                        <Button className="margin-right-small" type="button" onClick={() => this.openStoresPromoModal(row)}>Ubah</Button>
                    </td>
                )
            },
            {
                title: 'Delete',
                accessor: 'action',
                render: (row) => (
                    <td>
                        <a href="#" onClick={() => this.openDeleteStoresPromoModal(row)}>Delete</a>
                    </td>
                )
            },

        ]

        //#
        const rows = [];
        promoList.data.data.result.promo.map((promo, i) => {
            
            let row = {
                id: promo.id,
                price: promo.price,
                date: promo.date
            }

            rows.push(row);
        });

        this.setState({
            ...this.state,
            table: {
                ...this.state.table,
                columns: columns,
                rows: rows
            }
        }) 
    }

    //#
    openStoresPromoModal = (row) => {

        this.setState({
            ...this.state,
            // selectedPromo: row.data
            selectedPromo: row
      }, () => {
            this.toggleModal('updatePromo');
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

    //#Data from Modal
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

    //#Form Submit Function
    handleFormSubmit = (e) => {
        const { action } = this.props;
        let { selectedPromo } = this.state;
    
        e.preventDefault();

        let requiredData = {
            id : selectedPromo.id,
            price : selectedPromo.price,
            date: selectedPromo.date
        }

        action.updatePromo(requiredData).then(() => {
            const { store } = this.props;
            const { promoIsUpdated } = this.state;
            
            if (store.promoUpdate.isUpdated) {

                let dialogData = {
                      type: 'success',
                      title: 'Berhasil',
                      message: 'Berhasil mengubah Informasi Promo. Klik tombol berikut untuk kembali.',
                      onClose: () => window.location.reload(),
                      closeText: 'Kembali'
                }
        
                this.toggleDialog(dialogData);
          }

          if (store.promoUpdate.isError) {
                let dialogData = {
                      type: 'danger',
                      title: 'Gagal',
                      message: 'Gagal mengubah Informasi Promo. Klik tombol berikut untuk kembali.',
                      onClose: () => this.toggleDialog(),
                      closeText: 'Kembali'
                }
        
                this.toggleDialog(dialogData);
          }
        })
    }

    toggleDialog = (data) => {
        const { dialog, action } = this.props;

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

        console.log(this.props)
        
        return (
              <Dialog
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
       
    render() {
        
        return (
            <div>
                <AdminStoresPromoView 
                    // populateTableData = { this.populateTableData}
                    toggleModal = {this.toggleModal}
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit= {this.handleFormSubmit}
                    {...this.state} 
                    {...this.props} />
                    {this.renderDialog()}
            </div>
        )
    }
}

// export default AdminStoresPromo;
export default connect(mapStateToProps, mapDispatchToProps)(AdminStoresPromo); 
