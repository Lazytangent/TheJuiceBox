import { useState } from 'react';

import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import NavButton from '../Parts/Buttons/NavButton';

const LoginFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <NavButton name="Log In" onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;
