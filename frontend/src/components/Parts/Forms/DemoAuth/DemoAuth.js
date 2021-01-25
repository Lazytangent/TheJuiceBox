import { useDispatch } from 'react-redux';

import { demoLogin } from '../../../../store/session';

const DemoAuth = () => {
  const dispatch = useDispatch();

  const loginAsDemo = async () => {
    dispatch(demoLogin());
  };

  return (
    <div className="tw-flex tw-justify-center tw-pt-1.5">
      <button className="tw-border-2 tw-border-black tw-p-1 tw-rounded tw-bg-gray-300 hover:tw-bg-gray-400 tw-text-xl" onClick={loginAsDemo}>Login As Demo</button>
    </div>
  )
};

export default DemoAuth;
