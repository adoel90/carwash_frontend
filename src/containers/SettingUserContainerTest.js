import React, {Component} from 'react
import { connect } from 'react-redux';
import { SettingsUser } from '../components/';

class SettingUserContainerTest extends React.Component{


    constructor(props) {

	    super(props);
        this.handleCreateUser = this.handleCreateUser.bind(this);
        this.handleEventChange = this.handleEventChange.bind(this);

	    this.state = {
	      
	      persons: []
	    }
  	}

    handleCreateUser(e){
        e.preventDefault();

        const{dispatch} = this.props;
        console.log(e);
    }

    handleEventChange(e){
        e.preventDefault();
        console.log(e);
        
    }

  	render(){

  		return
  	}

    
}


const mapStateToProps = (state) => {

}

export default connect(mapStateToProps)(SettingUserContainerTest);
