import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [message, setMessage] = useState('');
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      setMessage('You are now logged in.');
      resetFormFields();
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case 'auth/user-not-found':
          setMessage('User was not found. Please try again.');
          break;
        case 'auth/wrong-password':
          setMessage('Wrong password. Please try again.');
          break;
        default:
          console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
      setMessage('You are now logged in.');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      {message && <div>{message}</div>}
      <form onSubmit={(event) => handleSubmit(event)}>
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

        <div className='buttons-container'>
          <Button type='submit' buttonType='default'>
            Sign In
          </Button>
          <Button type='button' onClick={signInWithGoogle} buttonType='google'>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
