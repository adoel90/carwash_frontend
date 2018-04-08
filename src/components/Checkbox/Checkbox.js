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
    const { handleCheckboxChange, labelState } = this.props;
    const { isChecked } = this.state;
    console.log(labelState);
    console.log(this.props);

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckboxChange(labelState);
    
  }

  render() {
    const { labelState } = this.props;
    const { isChecked, } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={labelState}
            checked={isChecked}
            onChange={this.toggleCheckboxChange()}
        />

          {labelState}
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