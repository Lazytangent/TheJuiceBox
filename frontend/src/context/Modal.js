import { createContext, useRef, useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

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
    <div className="tw-fixed tw-inset-0 tw-flex tw-justify-center tw-items-center">
      <div className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-70"id="modal-background" onClick={onClose} />
      <div className="tw-absolute" id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
};
