import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dialog } from '../../../components/Dialog';
import { getStoreList } from '../../../actions/vendor.action';
import { createMenuProduct } from '../../../actions/store.action';
import { AdminStoresMenuCreateView } from '../AdminStoresMenu';
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
        action: bindActionCreators({openDialog, closeDialog, createMenuProduct}, dispatch)
    }
}

class AdminStoresMenuCreate extends Component {

    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);

        this.state = {

            newMenuProduct: {
                store: '',
                name: '',
                deskripsi: '',
                harga: '',
                image: null

            },

            storeList: {},
            storeActive: 0
        }
    }

    componentDidMount(){
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();    
    }

    //#
    componentDidUpdate(prevProps){
        const { store } = this.props;
        //Get Store List
        if(prevProps.store.list !== store.list) {
            if (store.list.isLoaded) {
            
                this.setState({
                    ...this.state,
                    storeList: store.list.data.data.result.store

                }, () => {
                    console.log(this.state);
                    
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

        // console.log(this.props)
        
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

    handleImageChange = (object, e) => {
		const target = e.target;
		const files = target.files;
		const name = target.name;

		let reader = new FileReader();
		let file = files[0];

        console.log(reader);
        
		reader.onloadend = () => {

			if(object) {
				object['image'] = file;
                object['imagePreview'] = reader.result

				this.forceUpdate();
			}
		}

		reader.readAsDataURL(file);
	}

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { newMenuProduct, storeList, storeActive } = this.state;
        const { action} = this.props;
        
        const requiredData = {
            store: newMenuProduct.store ? parseInt(newMenuProduct.store) : "Failed parse INTEGER!!!",
            name: newMenuProduct.name,
            deskripsi: newMenuProduct.deskripsi,
            harga: newMenuProduct.harga,
            image: newMenuProduct.image
        }

        console.log(requiredData);

        action.createMenuProduct(requiredData).then(() => {
            // const { store } = this.props;

            if(this.props.store.menuproduk.isCreated) {
                let dialogData = {
                    type: 'success',
                    title: 'Berhasil',
                    message: 'Menu Produk telah berhasil ditambahkan. Klik tombol berikut untuk kembali.',
                    onClose: () => window.location.reload(),
                    closeText: 'Kembali'
                }
        
                this.toggleDialog(dialogData);
            }
            if (this.props.store.menuproduk.isError) {
                    let dialogData = {
                        type: 'danger',
                        title: 'Gagal',
                        message: 'Menu Produk gagal ditambahkan. Klik tombol berikut untuk kembali.',
                        onClose: () => this.toggleDialog(),
                        closeText: 'Kembali'
                    }
            
                    this.toggleDialog(dialogData);
            }

        });
    }

    render() {
        return (
            <div>
                <AdminStoresMenuCreateView 
                    {...this.state} 
                    {...this.props} 
                    handleInputChange = {this.handleInputChange}
                    handleFormSubmit = { this.handleFormSubmit }
                    handleImageChange= {this.handleImageChange}
                />
                {this.renderDialog()}
            </div>
        )   
    }
}

// export default AdminStoresMenuCreate;
export default connect(mapStateToProps, mapDispatchToProps)(AdminStoresMenuCreate); 