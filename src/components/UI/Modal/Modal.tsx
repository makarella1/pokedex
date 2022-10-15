import { PropsWithChildren } from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

interface ModalProps extends PropsWithChildren {
  onCloseModal: () => void;
}

export const Modal = ({ children, onCloseModal }: ModalProps) =>
  ReactDOM.createPortal(
    <>
      <div className={styles.backdrop} onClick={onCloseModal} />
      <div className={styles.modal}>{children}</div>
    </>,
    document.getElementById("modal") as HTMLElement
  );
