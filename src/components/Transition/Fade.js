import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

const duration = 300;
const defaultStyle = {
    transition: `all ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: {
        opacity: 0
    },
    entered: {
        opacity: 1,
    }
}

const Fade = props => {
    const {
        in: inProp,
        children
    } = props;

    const renderContent = (state) => (
        <div style={{...defaultStyle, ...transitionStyles[state] }}>
            {children}
        </div>
    )
    
    return (
        <Transition in={inProp} timeout={duration}>
            { renderContent }
        </Transition>
    );
};

Fade.propTypes = {
    
};

export default Fade;