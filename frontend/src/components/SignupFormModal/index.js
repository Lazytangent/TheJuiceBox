import { useState } from 'react';

import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

const SignupFormModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="tw-border-2 tw-p-1 tw-rounded tw-bg-gray-400 hover:tw-bg-gray-500" onClick={() => setShowModal(true)}>Register</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;
