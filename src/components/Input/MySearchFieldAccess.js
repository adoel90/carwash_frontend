import React from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';
import InputGroup from './InputGroup';
import InputAddon from './InputAddon';

class MySearchFieldAccess extends React.Component {
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
        <Input
            name="search"
            placeholder={this.props.name}
            size="lg"
            defaultValue={ this.props.defaultValue }
            onKeyUp={ this.props.search }
            style={{padding:'15px', marginTop: '-5px', marginLeft: '200px', width: '80%', zIndex: 0}}
        />
    );
  }
}

export default MySearchFieldAccess;