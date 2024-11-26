import '../assets/SignInForm/styles.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, Slide } from 'react-toastify';
import Input from './Input';

const SignInForm = () => {
  const SIGNIN_API_URL = import.meta.env.VITE_BACKEND_SIGNIN_API_URL;

  const EMAIL_REGEX = /^[\w\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/;

  const [signInError, setSignInError] = useState('');

  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (e) => {
    const res = await fetch(SIGNIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(e)
    });
    
    const data = await res.json();
    if (!res.ok) {
      setSignInError(data.message);
      toast.error(data.message);
    } else {
      setSignInError('');
      navigate('/');
      toast.success(data.message);
    }
    // TODO: put token in cookies
    console.log(data.token)
  };

  // Validation options for react-hook-forms.
  const emailValidation = {
    required: 'Email address is required.',
    pattern: {
      value: EMAIL_REGEX,
      message: 'Email address is invalid.',
    },
  };

  const passwordValidation = {
    required: 'Password is required.'
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form-container">
        <h1>Sign In</h1>
        {signInError && <p className="submission-error">{signInError}</p>}
        <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="email"
            label="Email address"
            options={emailValidation}
            validationError={errors.email}
          />
          <Input
            register={register}
            name="password"
            label="Password"
            options={passwordValidation}
            validationError={errors.password}
          />
          <button type="submit" disabled={!isValid}>
            Sign In
          </button>
        </form>
        <div className="form-nav">
          <p>Need an account? <NavLink to="/register">Register here.</NavLink></p>
          <a href="/">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
