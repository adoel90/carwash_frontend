import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const HeaderBlock = props => {
    const {
        children
    } = props;

    const classes = {
        headerBlock: classNames(
            'header__block'
        )
    }
    
    return (
        <div className={classes.headerBlock}>
            {children}
        </div>
    );
};

HeaderBlock.propTypes = {
    
};

export default HeaderBlock;