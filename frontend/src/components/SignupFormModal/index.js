import { useState } from 'react';

import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';
import NavButton from '../Parts/Buttons/NavButton';

const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <NavButton name="Register" onClick={() => setShowModal(true)} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;
