import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';
import InputGroup from './InputGroup';
import InputAddon from './InputAddon';
import InputAddonRight from './InputAddonRight';
import FormField from '../../layouts/Form/FormField';
// import { Form, FormField, FormGroup } from '../../layouts/Form';
// import { Input, InputGroup, InputAddon, Switch, Select, InputAddonRight } from '../../components/Input';
import  Button  from '../Button/Button';

class MySearchFieldWithPrint extends React.Component {
  // It's necessary to implement getValue
  getValue() {
    return ReactDOM.findDOMNode(this).value;
  }

  // It's necessary to implement setValue
  setValue(value) {
    ReactDOM.findDOMNode(this).value = value;
  }

  render() {
    return (
       
     
                <FormField>
                    <InputGroup>
                        <Input
                            name="search"
                            placeholder={this.props.name}
                            size="lg"
                            defaultValue={ this.props.defaultValue }
                            onKeyUp={ this.props.search }
                            style={{padding:'20px'}}
                            className="margin-right-small"
                        />
                    
                        
                        <Button theme="light">Print</Button>
                        
                    </InputGroup>
                </FormField> 

                
    
    )
  }
}

export default MySearchFieldWithPrint;