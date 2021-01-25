import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import FormDiv from '../Parts/Forms/FormDiv';
import AuthFormTab from '../Parts/Forms/AuthFormTab';
import DemoAuth from '../Parts/Forms/DemoAuth';
import ErrorsDiv from '../Parts/Forms/ErrorsDiv';
import { registerUser } from '../../store/session';

const SignupForm= () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = {
        username,
        email,
        password,
      };
      const res = await dispatch(registerUser(user));
      if (res.data && res.data.errors) setErrors(res.data.errors);
    } else {
      setErrors((prev) => [...prev, 'Password confirmation field does not match password field.']);
    }
  };

  return (
    <>
      <AuthFormTab />
      <form className="tw-bg-white tw-w-auto tw-m-auto tw-flex tw-flex-col tw-justify-between tw-p-8 tw-border-2 tw-border-black tw-rounded-lg" onSubmit={onSubmit}>
        <h3 className="tw-text-3xl tw-text-center tw-p-1">Register</h3>
        <ErrorsDiv errors={errors} />
        <FormDiv labelName="Username" required={true} type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <FormDiv labelName="Email" required={true} type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <FormDiv labelName="Password" required={true} type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <FormDiv labelName="Confirm Password" required={true} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <div className="tw-p-1.5 tw-flex tw-justify-center">
          <button className="tw-border-2 tw-border-black tw-p-1 tw-rounded tw-bg-gray-300 hover:tw-bg-gray-400 tw-text-xl" type="submit">Register</button>
        </div>
        <DemoAuth />
      </form>
    </>
  );
};

export default SignupForm;
