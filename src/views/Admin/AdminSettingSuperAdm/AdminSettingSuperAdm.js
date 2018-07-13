import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AdminSettingSuperAdmView } from '../AdminSettingSuperAdm';
import { getUserDetail, updateUser } from '../../../actions/user.action';
import { getAccessList } from '../../../actions/access.action';
import { openDialog, closeDialog } from '../../../actions/dialog.action';
import { Dialog } from '../../../components/Dialog';

class AdminSettingSuperAdm extends Component {
    constructor() {
        super();
        this.getAccessList = this.getAccessList.bind(this);
        this.getUserLogin = this.getUserLogin.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.renderDialog = this.renderDialog.bind(this);
        this.state = {
            updateUser: {
                name: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
                level: 0
            }
        }
    }

    componentDidMount = () => {
        this.getUserLogin();
        this.getAccessList();
    }

    componentDidUpdate = (prevProps) => {
        const {
            user
        } = this.props;

        if (prevProps.user.detail !== user.detail) {
            if(user.detail.isLoaded) {

                this.setState({
                    ...this.state,
                    updateUser: {
                        id: user.detail.data.data.result.id,
                        name: user.detail.data.data.result.name,
                        email: user.detail.data.data.result.email,
                        username: user.detail.data.data.result.username,
                        password: '',
                        confirmPassword: '',
                        level: user.detail.data.data.result.level.id
                    }
                }, () => {
                    this.forceUpdate();
                });
            }
        }
    }

    getUserLogin = () => {
        const {
            getUserDetail
        } = this.props;

        const user = JSON.parse(localStorage.getItem("userData"));

        getUserDetail(user);
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

    handleFormSubmit = (e) => {
        const {
            updateUser
        } = this.state;
        
        const {
            action
        } = this.props;
        
        e.preventDefault();

        if(updateUser.password === updateUser.confirmPassword) {
            const requiredData = {
                id : updateUser.id,
                username: updateUser.username ? updateUser.username : null,
                password: updateUser.password ? updateUser.password : null,
                name: updateUser.name ? updateUser.name : null,
                email: updateUser.email ? updateUser.email : null,
                level: updateUser.level
            }
    
            action.updateUser(requiredData).then(() => {
                const {
                    user
                } = this.props;

                if(user.updateUser.isUpdated) {
                    let dialogData = {
                        type: 'success',
                        title: 'Berhasil',
                        message: 'User telah berhasil diubah. Klik tombol berikut untuk kembali.',
                        onClose: () => window.location.reload(),
                        closeText: 'Kembali'
                    }
            
                    this.toggleDialog(dialogData);
                }
                if (user.updateUser.isError) {
                    let dialogData = {
                        type: 'danger',
                        title: 'Gagal',
                        message: 'User gagal diubah. Klik tombol berikut untuk kembali.',
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
                <AdminSettingSuperAdmView 
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
        getUserDetail: (id) => dispatch(getUserDetail(id)),
        getAccessList: (data) => dispatch(getAccessList(data)),
        action: bindActionCreators({ updateUser, openDialog, closeDialog }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSettingSuperAdm);