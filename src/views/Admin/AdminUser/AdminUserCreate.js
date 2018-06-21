import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AdminUserCreateView } from '../AdminUser';
import { createUser } from '../../../actions/user.action';
import { getAccessList } from '../../../actions/access.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { ModalDialog } from '../../../components/Modal';

class AdminUserCreate extends Component {
    constructor() {
        super();
        this.getAccessList = this.getAccessList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
        this.state = {
            newUser: {
                username: '',
                password: '',
                confirmPassword: '',
                name: '',
                email: '',
                level: 0
            }
        }
    }

    componentDidMount = () => {
        this.getAccessList();
    }

    getAccessList = () => {
        const {
            getAccessList
        } = this.props;

        let requiredData = {
            active : true
        }

        getAccessList(requiredData);
    }

    toggleDialog = (data) => {
        const {
            dialog,
            action
        } = this.props;

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
            <ModalDialog
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

    handleFormSubmit = (e) => {
        const {
            newUser
        } = this.state;
        
        const {
            action
        } = this.props;
        
        e.preventDefault();

        if(newUser.password === newUser.confirmPassword) {
            const requiredData = {
                username: newUser.username ? newUser.username : null,
                password: newUser.password ? newUser.password : null,
                name: newUser.name ? newUser.name : null,
                email: newUser.email ? newUser.email : null,
                level: newUser.level
            }
    
            action.createUser(requiredData).then(() => {
                const {
                    user
                } = this.props;
                
                if(user.item.isCreated) {
                    let dialogData = {
                        type: 'success',
                        title: 'Berhasil',
                        message: 'User telah berhasil ditambahkan. Klik tombol berikut untuk kembali.',
                        onClose: () => window.location.reload(),
                        closeText: 'Kembali'
                    }
            
                    this.toggleDialog(dialogData);
                }
                if (user.item.isError) {
                    let dialogData = {
                        type: 'danger',
                        title: 'Gagal',
                        message: 'User tidak bisa ditambahkan. Klik tombol berikut untuk kembali.',
                        onClose: () => this.toggleDialog(),
                        closeText: 'Kembali'
                    }
            
                    this.toggleDialog(dialogData);
                }
            });
        } else {
            let dialogData = {
                type: 'danger',
                title: 'Gagal',
                message: 'Kata sandi tidak cocok. Silahkan coba lagi.',
                onClose: () => this.toggleDialog(),
                closeText: 'Kembali'
            }
    
            this.toggleDialog(dialogData);
        }
    }

    render() {
        return (
            <div>
                <AdminUserCreateView 
                    {...this.state} 
                    {...this.props} 
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                />
                {this.renderDialog()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        access: state.access,
        dialog: state.dialog
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccessList: (data) => dispatch(getAccessList(data)),
        action: bindActionCreators({ createUser, openDialog, closeDialog }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUserCreate);