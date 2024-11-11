import '../assets/SignInForm/styles.css';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import Input from './Input';

const SignInForm = () => {
  const EMAIL_REGEX = /^[\w\-.]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/;

  const {
    register,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({ mode: 'onChange' });

  const onSubmit = (e) => console.log(e.email);

  // Validation options for react-hook-forms.
  const emailValidation = {
    required: 'Email address is required.',
    pattern: {
      value: EMAIL_REGEX,
      message: 'Email address is invalid.',
    },
  };

  const passwordValidation = {
    required: 'Password is required.',
    minLength: {
      value: 8,
      message: 'Must be at least 8 characters long.',
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form-container">
        <header>Sign In</header>
        <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            name="email"
            label="Email address"
            options={emailValidation}
            errors={errors.email}
          />
          <Input
            register={register}
            name="password"
            label="Password"
            options={passwordValidation}
            errors={errors.password}
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
