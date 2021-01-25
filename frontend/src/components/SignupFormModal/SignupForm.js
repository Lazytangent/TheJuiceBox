import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './SignupForm.css';
import FormDiv from '../Parts/Forms/FormDiv';
import AuthFormTab from '../Parts/Forms/AuthFormTab';
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
      <form className="tw-w-auto tw-m-auto tw-flex tw-flex-col tw-justify-between tw-p-8 tw-border-2 tw-border-black tw-rounded-lg" onSubmit={onSubmit}>
        <h3 className="tw-text-3xl tw-text-center tw-p-1">Register</h3>
        {
          errors.length > 0 && (
          <ul className="errors-list">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          )
        }
        <FormDiv labelName="Username" required={true} type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <FormDiv labelName="Email" required={true} type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <FormDiv labelName="Password" required={true} type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <FormDiv labelName="Confirm Password" required={true} type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        <div className="form__button-div">
          <button className="form__button-div--button" type="submit">Register</button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
