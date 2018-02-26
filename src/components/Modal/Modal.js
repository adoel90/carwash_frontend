import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Portal } from 'react-portal';
import { Fade } from '../Transition';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        }
    }

    componentDidMount = () => {
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            ...this.state,
            isOpen: nextProps.isOpen
        });
    }

    render() {
        const {
            isOpen
        } = this.state;
        
        const {
            toggle,
            className,
            children
        } = this.props;
        
        const classes = {
            modal: classNames(
                `modal`,
                className
            ),
            modalDialog: classNames(
                `modal__dialog`
            ),
            modalBackdrop: classNames(
                `modal__backdrop`
            )
        }

        if(isOpen) {
            return ( 
                <Portal node={document && document.getElementById('root')}>
                    <div className={classes.modal}>
                        <div className={classes.modalDialog}>
                            {children}
                        </div>
                        <span className={classes.modalBackdrop} onClick={toggle}></span>
                    </div>
                </Portal>
            )
        }
        
        return null;
    }
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
}

export default Modal;