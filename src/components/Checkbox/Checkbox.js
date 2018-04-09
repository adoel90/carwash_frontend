// import React, { Component, PropTypes } from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
  
    constructor(){
        super();
        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
        this.state = {
            isChecked: false,
          }
    }


  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;
    const { isChecked } = this.state;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(label);
    
  }

  render() {
    const { label } = this.props;
    const { isChecked, } = this.state;

    console.log(label);
    

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            // value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange()}
        />

          {label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;