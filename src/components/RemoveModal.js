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
          color="blue-500"
          className="rounded-lg ml-auto mr-2"
          onClick={onClose}
          text="Discard"
        />
        <Button
          color="red-500"
          className="rounded-lg"
          onClick={onDelete}
          text="Delete"
        />
      </ModalFooter>
    </Modal>
  );
}
