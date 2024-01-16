// ConfirmationModal.jsx

import React from "react";
import { Modal, Button } from "@mui/material";

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
    >
      <div className="bg-white p-4 rounded-md w-80">
        <p className="text-center">
          Are you sure you want to delete this customer ?
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <Button
            variant="contained"
            color="success"
            onClick={onConfirm}
            className="px-4"
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={onClose}
            className="px-4"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
