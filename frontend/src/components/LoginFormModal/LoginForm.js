import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';
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
    if (res.data && res.data.errors) setErrors(res.data.errors);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <h3>Login</h3>
        {
          errors.length > 0 && (
          <ul className="errors-list">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          )
        }
        <div className="form__input-group">
          <label className="form__input-group--label">
            Username or Email
          </label>
          <input required className="form__input-group--input-field" type="text" value={credential} onChange={e => setCredential(e.target.value)} />
        </div>
        <div className="form__input-group">
          <label className="form__input-group--label">
            Password
          </label>
          <input required className="form__input-group--input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form__button-div">
          <button className="form__button-div--button" type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
