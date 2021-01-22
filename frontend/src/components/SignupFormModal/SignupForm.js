import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './SignupForm.css';
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
      <form className="form" onSubmit={onSubmit}>
        <h3>Register</h3>
        {
          errors.length > 0 && (
          <ul className="errors-list">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          )
        }
        <div className="form__input-group">
          <label className="form__input-group--label">Username</label>
          <input required className="form__input-group--input-field" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="form__input-group">
          <label className="form__input-group--label">Email</label>
          <input required className="form__input-group--input-field" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form__input-group">
          <label className="form__input-group--label">Password</label>
          <input required className="form__input-group--input-field" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="form__input-group">
          <label className="form__input-group--label">Confirm Password</label>
          <input required className="form__input-group--input-field" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>
        <div className="form__button-div">
          <button className="form__button-div--button" type="submit">Register</button>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
