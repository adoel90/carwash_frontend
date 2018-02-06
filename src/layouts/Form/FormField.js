import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormField = props => {
    const {
        label,
        children,
        className
    } = props;

    const renderLabel = label ? <label className="form__label">{label}</label> : null;
    
    return (
        <div className="form__field">
            { renderLabel }
            { children }
        </div>
    )
};

FormField.propTypes = {
    label: PropTypes.string,
    tag: PropTypes.oneOfType([
        PropTypes.func, PropTypes.string,
    ]),
};

export default FormField;