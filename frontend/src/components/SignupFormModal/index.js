import { Modal } from '../../context/Modal';
import { useUserAuth } from '../../context/AuthContext';
import SignupForm from './SignupForm';
import NavButton from '../Parts/Buttons/NavButton';

const SignupFormModal = () => {
  const { showRegisterModal, setShowRegisterModal } = useUserAuth();

  return (
    <>
      <NavButton name="Register" onClick={() => setShowRegisterModal(true)} />
      {showRegisterModal && (
        <Modal onClose={() => setShowRegisterModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
};

export default SignupFormModal;
