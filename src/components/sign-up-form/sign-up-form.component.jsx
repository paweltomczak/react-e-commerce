import { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassowrd: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [message, setMessage] = useState('');
  const { displayName, email, password, confirmPassowrd } = formFields;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassowrd) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      setMessage('Account has been successfully created.');
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setMessage('Cannot create a user, email already in use');
          break;
        case 'auth/weak-password':
          setMessage('Weak password. Password should be at least 6 characters');
          break;
        default:
          console.log(error);
      }
    }
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  return (
    <div>
      <h1>Sign up with your email and password</h1>
      {message}
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Display Name</label>
        <input
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
        <label>Email</label>
        <input
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <label>Password</label>
        <input
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <label>Confirm Password</label>
        <input
          type='password'
          required
          onChange={handleChange}
          name='confirmPassowrd'
          value={confirmPassowrd}
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
