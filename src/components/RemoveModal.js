import React from "react";
import Button from "./utils/Button";
import Modal, { ModalBody, ModalFooter, ModalHeader } from "./utils/Modal";

export default function RemoveModal({ onDelete, onClose, isLoading }) {
  return (
    <Modal open={true} onClose={onClose}>
      <ModalHeader closeButton>Delete Document</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete the current document?</p>
      </ModalBody>
      <ModalFooter>
        <Button
          className="rounded-lg bg-blue-500 text-white hover:opacity-80 ml-auto mr-2"
          onClick={onClose}
          text="Discard"
        />
        <Button
          className="rounded-lg bg-red-500 text-white hover:opacity-80"
          onClick={onDelete}
          text="Delete"
        />
      </ModalFooter>
    </Modal>
  );
}
