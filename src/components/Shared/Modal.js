import React from 'react';
import { Modal } from 'react-responsive-modal';

const modalWindow = (props) => {
    const { open, onClose, children } = props;
    return (
        <Modal
            classNames={{
                modal: 'Custom_Modal',
            }}
            open={open}
            onClose={() => onClose()} center
            showCloseIcon={false}>
            {children}
        </Modal>
    )
}

export default modalWindow;