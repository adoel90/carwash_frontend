import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import classNames from 'classnames';

const Switch = props => {
    const {
        className,
        children,
        checked,
        ...attributes
    } = props;

    const classes = {
        switch: classNames(
            `switch`,
            checked ? `switch--checked` : null,
            className
        ),
        checkbox: classNames(
            `switch__checkbox`
        ),
        slider: classNames(
            `switch__slider`
        )
    }

    console.log(attributes);
    
    return (
        <label className={classes.switch}>
            <Input type="checkbox" className={classes.checkbox} {...attributes} />
            <span className={classes.slider}></span>
        </label>
    );
};

Switch.propTypes = {
    
};

export default Switch;