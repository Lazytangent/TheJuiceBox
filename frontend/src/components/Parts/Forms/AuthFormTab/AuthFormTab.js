import { useUserAuth } from '../../../../context/AuthContext';

const AuthFormTab = () => {
  const { showLoginModal, setShowLoginModal, showRegisterModal, setShowRegisterModal } = useUserAuth();

  const LoginTabClickHandler = () => {
    if (!showLoginModal) {
      setShowRegisterModal(false);
      setShowLoginModal(true);
    }
  };

  const RegisterTabClickHandler = () => {
    if (!showRegisterModal) {
      setShowLoginModal(false);
      setShowRegisterModal(true);
    }
  };

  return (
    <div className="tw-p-1 tw-flex tw-justify-around">
      <button onClick={LoginTabClickHandler}>Log In</button>
      <button onClick={RegisterTabClickHandler}>Register</button>
    </div>
  );
};

export default AuthFormTab;
