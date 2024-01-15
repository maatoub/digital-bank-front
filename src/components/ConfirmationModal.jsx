import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <p>Are you sure you want to delete this Customer ?</p>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
