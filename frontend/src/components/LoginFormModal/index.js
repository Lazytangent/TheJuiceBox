import { Modal } from '../../context/Modal';
import { useUserAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import NavButton from '../Parts/Buttons/NavButton';

const LoginFormModal = () => {
  const { showLoginModal, setShowLoginModal } = useUserAuth();

  return (
    <>
      <NavButton name="Log In" onClick={() => setShowLoginModal(true)} />
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
};

export default LoginFormModal;
