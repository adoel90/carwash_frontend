import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const InputGroup = props => {
    const {
        children,
        className
    } = props;
    
    return (
        <div className="input-group">
            {children}
        </div>
    );
};

InputGroup.propTypes = {
    
};

export default InputGroup;