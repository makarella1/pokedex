import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onCloseModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onCloseModal }) =>
  ReactDOM.createPortal(
    <>
      <div className={styles.backdrop} onClick={onCloseModal} />
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
