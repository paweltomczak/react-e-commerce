import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

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
      console.log(error);
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
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      {message}
      <form onSubmit={(event) => handleSubmit(event)}>
        <FormInput
          label='Display Name'
          type='text'
          required
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <FormInput
          label='Confirm Password'
          type='password'
          required
          onChange={handleChange}
          name='confirmPassowrd'
          value={confirmPassowrd}
        />
        <Button type='submit' buttonType='default'>
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
