import React from 'react';

const ModalContent = (props) => {
    const {
        children
    } = props;

    return <div className="modal__content">{children}</div>
}

export default ModalContent;
