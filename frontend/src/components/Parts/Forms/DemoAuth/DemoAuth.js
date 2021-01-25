import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../../store/session';

const DemoAuth = () => {
  const dispatch = useDispatch();

  const loginAsDemo = async () => {
    const res = await dispatch(login({ credential: 'Demo-Dave', password: 'password' }));
  };

  return (
    <>
      <button className="tw-border-2 tw-border-black tw-p-1 tw-rounded tw-bg-gray-300 hover:tw-bg-gray-400 tw-text-xl" onClick={loginAsDemo}>Login As Demo</button>
    </>
  )
};

export default DemoAuth;
