import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FormDiv from '../Parts/Forms/FormDiv';
import AuthFormTab from '../Parts/Forms/AuthFormTab';
import ErrorsDiv from '../Parts/Forms/ErrorsDiv';
import DemoAuth from '../Parts/Forms/DemoAuth';
import SubmitBtn from '../Parts/Forms/SubmitBtn';
import { login } from '../../store/session';

const LoginForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const user = {
      credential,
      password,
    };
    const res = await dispatch(login(user));
    if (res.data && res.data.errors) {
      setErrors(res.data.errors);
      console.log(res.data.errors);
    }
  };

  return (
    <>
      <AuthFormTab />
      <form onSubmit={onSubmit} className="tw-bg-white tw-w-auto tw-m-auto tw-flex tw-flex-col tw-justify-between tw-p-8 tw-border-2 tw-border-black tw-rounded-lg">
        <h3 className="tw-text-3xl tw-text-center tw-p-1">Login</h3>
        <ErrorsDiv errors={errors} />
        <FormDiv labelName="Username or Email" required={true} type="text" value={credential} onChange={e => setCredential(e.target.value)} />
        <FormDiv labelName="Password" required={true} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <SubmitBtn name="Login" />
        <DemoAuth />
      </form>
    </>
  );
};

export default LoginForm;
