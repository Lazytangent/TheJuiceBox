import { useUserAuth } from '../../../../context/AuthContext';

const AuthFormTab = () => {
  const { showLoginModal, setShowLoginModal, showRegisterModal, setShowRegisterModal } = useUserAuth();

  const LoginTabClickHandler = (e) => {
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
    <div className="tw-bg-white tw-border-2 tw-border-black tw-flex">
      <button disabled={showLoginModal} onClick={LoginTabClickHandler} className="tw-w-2/4 hover:tw-bg-gray-400 disabled:tw-bg-gray-500 disabled:tw-cursor-not-allowed tw-p-1 tw-bg-gray-300 tw-px-3">Log In</button>
      <button disabled={showRegisterModal} onClick={RegisterTabClickHandler} className="tw-w-2/4 hover:tw-bg-gray-400 disabled:tw-bg-gray-500 disabled:tw-cursor-not-allowed tw-p-1 tw-bg-gray-300 tw-px-3">Register</button>
    </div>
  );
};

export default AuthFormTab;
