import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminUserCreateView } from '../AdminUser';
import { createUser } from '../../../actions/user.action';
import { getAccessList } from '../../../actions/access.action';

function mapStateToProps(state) {
    return {
        user: state.user,
        access: state.access
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAccessList: () => dispatch(getAccessList()),
        createUser: (data) => dispatch(createUser(data))
    }
}

class AdminUserCreate extends Component {
    constructor() {
        super();
        this.getAccessList = this.getAccessList.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

        getAccessList();
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
            createUser
        } = this.props;
        
        e.preventDefault();

        if(newUser.password === newUser.confirmPassword) {
            const requiredData = {
                username: newUser.username,
                password: newUser.password,
                name: newUser.name,
                email: newUser.email,
                level: newUser.level
            }
    
            createUser(requiredData);
        }
    }

    render() {
        return (
            <AdminUserCreateView 
                {...this.state} 
                {...this.props} 
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminUserCreate);