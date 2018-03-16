import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import classNames from 'classnames';

const SwitchSquare = props => {
    const {
        className,
        children,
        checked,
        ...attributes
    } = props;

    const classes = {
        switch: classNames(
            `switch-square`,
            checked ? `switch-square--checked` : null,
            className
        ),
        checkbox: classNames(
            `switch-square__checkbox`
        ),
        slider: classNames(
            `switch-square__slider`
        )
    }
    
    return (
        <label className={classes.switch}>
            <Input type="checkbox" className={classes.checkbox} {...attributes} />
            <span className={classes.slider}></span>
        </label>
    );
};

SwitchSquare.propTypes = {
    
};

export default SwitchSquare;