import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { customerLogin } from '../../../actions/authentication.action';//Scenario-nya kasir meminta customer untuk GESEK KARTU MEMBER
import { StoreCashierTopUpView } from '../StoreCashierTopUp';


function mapStateToProps(state) {
    return {
        authentication: state.authentication 
    };
}

function mapDispatchToProps(dispatch) {
    return {
        customerLogin: bindActionCreators(customerLogin, dispatch)
    }
}

class StoreCashierTopUp extends Component {

    constructor(){
        super();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        // this.handleTopUp = this.handleTopUp.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.state = {

			authData: {
				cardID: ''
            },
            
            authenticatedMember: {
				data: {},
				isAuthenticated: false
            },
            
            isModalOpen: {
				topup: false
			},
		}
    }


    //#Get data member yang sedang TOP UP
    componentDidUpdate(prevProps){

        const { authentication } = this.props;
        const { isModalOpen } = this.state;

        if(prevProps.authentication.userData !== authentication.userData){
            if(authentication.isAuthenticated){
                console.log("Authenticated member !!!");

                this.setState({
                    ...this.state,
                    authenticatedMember: authentication.userData.member,
                    isModalOpen: {
                        ...isModalOpen,
                        topup: true
                    }
                }, ()=> {
                    console.log(this.state);

                    this.forceUpdate();
                    // this.handleTopUp();
                    this.toggleModal("topup")
                    
                })
            }
        }
    }

    handleInputChange = (object, e) => {

		const target = e.target;
		const value = target.value;
        const name = target.name;
		
		this.setState({
			[object]: {
				[name]: value
			}
        }); 
        
        // if(object) {
		// 	object[name] = value;
		// 	this.forceUpdate();
		// } else {
		// 	this.setState({
		// 		[name]: value
		// 	})
		// }
    }
    
    handleAuthentication = (e) => {

		e.preventDefault();
		const {customerLogin } = this.props;
		const {authData } = this.state;
		let requireData = {
			cardID: authData.cardID
		}
        
		// customerLogin(requireData);
    }
    
    toggleModal = (name) => {

        console.log(name);
        
        const { isModalOpen } = this.state;
        
		// this.setState({
        //     ...this.state,
		// 	isModalOpen: {
		// 		...isModalOpen,
		// 		[name]: !isModalOpen[name]
		// 	}
		// }, ()=> {
        //     console.log(this.state);
            
        // })

        this.setState({
            ...this.state,
			isModalOpen: {
				...isModalOpen,
				[name]: !isModalOpen[name]
			}
		})
    }
    
    // handleTopUp = () => {
    //     this.toggleModal('topup');
    //     console.log(this.state);
        
    // }

  

    render() {
        
        return ( 
        
            <StoreCashierTopUpView {...this.state} {...this.props} 
                handleInputChange = {this.handleInputChange}
                handleAuthentication = { this.handleAuthentication}
                toggleModal={this.toggleModal}
            />

        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreCashierTopUp);