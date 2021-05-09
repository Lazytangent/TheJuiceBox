import { createContext, useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
};

export const Modal = ({ onClose, children }) => {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalMainDiv}>
      <div className={styles.modalBackground} id="modal-background" onClick={onClose} />
      <div className={styles.modalContent} id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
};
