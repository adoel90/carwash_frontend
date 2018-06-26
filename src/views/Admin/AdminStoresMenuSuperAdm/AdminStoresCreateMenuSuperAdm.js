import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStoreList } from '../../../actions/store.action';
import { createMenuProduct } from '../../../actions/store.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';

import { Dialog } from '../../../components/Dialog';
import { AdminStoresCreateMenuSuperAdmView } from '../AdminStoresMenuSuperAdm';


function mapStateToProps(state) {
    return {
        vendorState: state.vendorState,
        store: state.store,
        dialog: state.dialog
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getStoreListDispatch: () => dispatch(getStoreList()),
        // getAccessListDispatch: (data) => dispatch(getAccessList(data)),
        action: bindActionCreators({openDialog, closeDialog, createMenuProduct}, dispatch)
    }
}


class AdminStoresCreateMenuSuperAdm extends Component {


    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.renderDialog = this.renderDialog.bind(this);

        this.handleInputChangeSpecial = this.handleInputChangeSpecial.bind(this);
        this.getAttributeById = this.getAttributeById.bind(this);

        this.state = {

            newMenuProductSpecial:{
                idStore:''
            },
            typeStore:'',
            nameStore:'',

            newMenuProduct: {
                store: '',
                name: '',
                deskripsi: '',
                harga: '',
                image: null,
                category: false

            },

            storeList: {},
            storeActive: 0,
            obj: null
        }
    }

    componentDidMount(){
        //#
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();

    }

    componentDidUpdate(prevProps){
        const { store } = this.props;
        const { storeActiveLis,newMenuProduct } = this.state;

        //#GET STORE LIST
        if(prevProps.store.list !== store.list){   
            if(store.list.isLoaded){
                this.setState({  
                    ...this.state,
                    storeList: store.list.isLoaded ? store.list.data.data.result.store : null
                });
            }

            //Get Type Store from Dropdownlist
            if(store.list.isLoaded){
                const found =  store.list.isLoaded ? store.list.data.data.result.store.find((element) => {

                    if(element.id === parseInt(newMenuProduct.store)){

                        console.log(element);

                        this.setState({
                            ...this.state,
                            typeStore: element.type.id,
                            nameStore: element.name

                        });
                    }
                 }) : null;        
            } else {
                console.log("Errur to Get Type Store from Dropdownlist ");
            }
        }
    }

    //#
    toggleDialog = (data) => {
        const { dialog, action } = this.props;

        if(!dialog.isOpened) {
            action.openDialog(data);
        } else {
            action.closeDialog();
        };
    }

    //#Fungsi Modal Dll
    renderDialog = () => {
        const { dialog, toggleDialog } = this.props;

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
        // const value = target.value;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
              ...this.state,
              [object]: {
                    ...this.state[object],
                    [name]: value
              }
        }, () => {
           
        });

        console.log(this.state.newMenuProduct);
        const { getStoreListDispatch } = this.props;
        getStoreListDispatch();
    };

    handleInputChangeSpecial = (object, e) => {
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
        
        // const { stateObject } = this.state;
        // this.setState({
        //     ...this.state,
        //     obj: this.props.listOption[e.target.value].obj
        // });//https://stackoverflow.com/questions/42564515/react-selecting-option-with-object-as-attribut-value
    };

    getAttributeById = (data) => {
        console.log(data);
    }

    handleImageChange = (object, e) => {
		const target = e.target;
		const files = target.files;
		const name = target.name;

		let reader = new FileReader();
		let file = files[0];

        // console.log(reader);
        
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
            harga: parseInt(newMenuProduct.harga.replace(/,/g, '')),
            image: newMenuProduct.image
        }

        action.createMenuProduct(requiredData).then(() => {
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
                <AdminStoresCreateMenuSuperAdmView 
                    handleInputChange = { this.handleInputChange }
                    handleFormSubmit = { this.handleFormSubmit}
                    handleImageChange = { this.handleImageChange}
                    handleInputChangeSpecial = { this.handleInputChangeSpecial}
                    {...this.state}
                    {...this.props}
                />

                {this.renderDialog()}
            </div>
        );
    }
}

// export default AdminStoresCreateMenuSuperAdm;
export default connect( mapStateToProps, mapDispatchToProps )(AdminStoresCreateMenuSuperAdm);