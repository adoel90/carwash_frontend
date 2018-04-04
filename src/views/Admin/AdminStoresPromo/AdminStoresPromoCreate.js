import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dialog } from '../../../components/Dialog';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import { getStoreList } from '../../../actions/vendor.action';
// import { createMenuProduct } from '../../../actions/store.action';
import { createDiscountPromo } from '../../../actions/store.action';
import { AdminStoresPromoCreateView } from '../AdminStoresPromo';
import { openDialog, closeDialog } from '../../../actions/dialog.action';


function mapStateToProps(state) {
    return {
        store : state.store,
        dialog: state.dialog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        // createMenuProductDispatch : (data) => dispatch(createMenuProduct(data)),
        action: bindActionCreators({openDialog, closeDialog, createDiscountPromo}, dispatch)
    }
}

class AdminStoresPromoCreate extends Component {

    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.getStoreList = this.getStoreList.bind(this);
        this.handlePeriodChange = this.handlePeriodChange.bind(this);
        // this.renderDialog = this.renderDialog.bind(this);

        this.state = {

            newPromoDiscount: {
                store: {},
                price: null,
                date: null

            },

            storeList: {},
            storeActive: 0,
            period: {
        		from: moment().add(-1, 'month'),
        		to: moment()
            },

        }
    }

    componentDidMount(){
        this.getStoreList();
    }

    //#
    componentDidUpdate = (prevProps) => {
        const { store } = this.props;

        if(prevProps.store.list !== store.list) {
            if (store.list.isLoaded) {
                this.setState({
                    ...this.state,
                    storeList: this.props.store.list.data.data.result.store
                }, () => {
                    this.forceUpdate();
                })
            }
        }
        
    }

    toggleDialog = (data) => {
        const { dialog, action } = this.props;

        if(!dialog.isOpened) {
            action.openDialog(data);
        } else {
            action.closeDialog();
        }
    }

    //#Fungsi Modal Dll
    renderDialog = () => {
        const {
            dialog,
            toggleDialog
        } = this.props;
        
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

        //#
    handlePeriodChange = (type, date) => {

        const { period } = this.state;
        period[type] = date;
        this.forceUpdate();
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

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { newPromoDiscount, storeList, storeActive, period } = this.state;
        const { action} = this.props;
        
        const requiredData = {
            
            store: newPromoDiscount.store,
            price: newPromoDiscount.price,
            date: period.to.format('YYYY-MM-DD')
        }

        console.log(requiredData);

        action.createDiscountPromo(requiredData).then(() => {
             if(this.props.store.promodiscount.isCreated){
                let dialogData = {
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Discount khusus berhasil di buat. Klik tombol berikut untuk kembali.',
                    onClose: () => window.location.reload(),
                    closeText: 'Kembali'
                }
        
                this.toggleDialog(dialogData);
                
             } 

             if(this.props.store.promodiscount.isError){
                let dialogData = {
                    type: 'danger',
                    title: 'Gagal',
                    message: 'Discount gagal ditambahkan. Klik tombol berikut untuk kembali.',
                    onClose: () => this.toggleDialog(),
                    closeText: 'Kembali'
                }
        
                this.toggleDialog(dialogData);
             }

        });
    }


    getStoreList = () => {
        const { getStoreListDispatch } = this.props;

        getStoreListDispatch();
    }

    render() {
        return (
            <div>
                <AdminStoresPromoCreateView 
                    handleInputChange = {this.handleInputChange}
                    handleFormSubmit = { this.handleFormSubmit }
                    handleImageChange= {this.handleImageChange}
                    handlePeriodChange= {this.handlePeriodChange}
                    {...this.state} 
                    {...this.props} />
                {this.renderDialog()}
            </div>
        )   
    }
}

// export default AdminStoresMenuCreate;
export default connect(mapStateToProps, mapDispatchToProps)(AdminStoresPromoCreate); 