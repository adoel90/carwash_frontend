import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { adminLogin } from '../../../actions/authentication.action';
import { AdminLoginView } from '../AdminLogin';
import { Map, fromJS, assert, List } from 'immutable';


//**************IGNORE THESE CODES, ONLY EXPLORING IMMUTABLE JS ********************* */

//#Wew Immutable
const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') + " vs. " + map2.get('b') // 2 vs. 50

// console.log('Ini b :  ', map1.get('b'));

//#Nested Structure
const data = fromJS(
                    { 
                        my: 
                            { nested: 
                                { name: 'Will' } 
                            } 
                    }
                );

const goodName = data.getIn(['my', 'nested', 'name']);
// console.log(goodName); // prints Will    

//#Use .equals() instead ===
// const map3 = Map( 
//                     {
//                         a: 1, 
//                         b: 2, 
//                         c: 3 
//                     }
//                 )
// const map4 = map1.set('b', 2);
// assert.equal(map3, map4);


//#Chaining Manipulations
const pets = List(['cat', 'dog']);
const finalPets = pets.push('goldfish').push('tortoise');
console.log(finalPets.toJS());
console.log(pets.toJS()); // prints ['cat', 'dog'];
// prints ['cat', 'dog', 'goldfish', 'tortoise'];





//*********************************** */

function mapStateToProps(state) {
    
    return {
        authentication: state.authentication 
    };
}

function mapDispatchToProps(dispatch) {
    return {
        adminLogin: bindActionCreators(adminLogin, dispatch)
    }
}

class AdminLogin extends Component {    
    constructor() {
        super();
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.state = {
            credentials: {
                username: '',
                password: ''
            }
        }
    }

    componentDidMount = () => {
        this.props.handleRedirect();
    }

    handleInputChange = (object, e) => {        
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        this.setState(prevState => ({
            ...prevState,
            [object]: {
                ...prevState[object],
                [name]: value    
            }
        }));
    }

    onLoginSubmit = (e) => {
        e.preventDefault();
        this.handleAuthentication();
    }

    handleAuthentication = (e) => {
        const { credentials } = this.state;

        const { adminLogin } = this.props;
        
        const requiredData = {
            username: credentials.username,
            password: credentials.password
        }
        
        adminLogin(requiredData);
    }
    
    render() {
        return (
            <AdminLoginView 
                {...this.props} 
                {...this.state}
                handleInputChange={this.handleInputChange}
                onLoginSubmit={this.onLoginSubmit}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLogin);