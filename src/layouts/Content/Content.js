import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Content = props => {
    const {
        children,
        className
    } = props;

    const classes = {
        content: classNames(
            `content`,
            className
        ),
        contentContainer: classNames(
            `content__container`
        )
    }
    
    return <main className={classes.content}>{children}</main>
};

Content.propTypes = {
    
};

export default Content;