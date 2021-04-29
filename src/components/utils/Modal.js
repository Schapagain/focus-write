import React, { useState, useEffect, cloneElement } from "react";
import classNames from "classnames";

/**
 *
 * @param {Object} props
 * @param {String} className
 * @param {Boolean} open
 * @param {Array<Element>} children
 * @param {Function} onClose
 * @returns
 */
const Modal = ({ className, open = false, children, onClose }) => {
  const [isOpen, setOpen] = useState(open);
  useEffect(() => {
    setOpen(open);
  }, [open]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeModal = () => {
    onClose();
    setOpen(false);
  };

  const originalChildren = React.Children.toArray(children);
  const injectedChildren = originalChildren.map((child) =>
    child.type.name === "ModalHeader"
      ? cloneElement(child, { closeModal })
      : child
  );

  const modalClasses = classNames(className, {
    "fixed z-50 left-1/2 flex transform animate-modal-slide-down -translate-x-1/2": true,
    "min-h-60 w-screen-1/2": true,
    "bg-white rounded-xl": true,
  });

  const overlayClasses = classNames({
    "inset-0 fixed z-40 bg-gray-400 bg-opacity-50": true,
    "transition-normal": true,
    "opacity-0 pointer-events-none": !isOpen,
    "opacity-100": isOpen,
  });

  return (
    <>
      <div style={{ top: "10%" }} className={modalClasses}>
        {isOpen && (
          <div className="relative h-auto w-full">{injectedChildren}</div>
        )}
      </div>
      <div onClick={closeModal} className={overlayClasses}></div>
    </>
  );
};

export const ModalHeader = ({ children, closeModal, closeButton = false }) => {
  return (
    <div className="text-xl h-4/12 max-h-20 top-0 p-5 absolute w-full">
      {children}
      {closeButton && (
        <span
          onClick={closeModal}
          className="cursor-pointer absolute text-md text-gray-400 top-5 right-5"
        >
          x
        </span>
      )}
      <span
        aria-hidden={true}
        className="absolute border-gray-200 border bottom-0 left-0 w-full"
      ></span>
    </div>
  );
};

export const ModalFooter = ({ children, className }) => {
  return (
    <div
      className={
        className + " p-5 flex max-h-20 h-4/12 bottom-0  p-5 absolute w-full"
      }
    >
      {children}
      <span
        aria-hidden={true}
        className="absolute border-gray-200 border top-0 left-0 w-full"
      ></span>
    </div>
  );
};

export const ModalBody = ({ children }) => {
  return <div className="py-24 px-5 w-full">{children}</div>;
};

Modal.defaultProps = {
  onClose: () => null,
};

ModalHeader.defaultProps = {
  closeModal: () => null,
};

export default Modal;
