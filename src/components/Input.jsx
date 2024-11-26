import '../assets/Input/styles.css';

const Input = ({ register, name, label, options, validationError, submissionError=null }) => {
  const inputType = ['password', 'confirmPassword'].includes(name)
    ? 'password'
    : 'text';

  return (
    <>
      <label>{label}:</label>
      <input 
        className={`form-input${submissionError?.includes(name) ? ' input-error' : ''}`}
        type={inputType}  
        {...register(name, options)} />
      <div className="error-tooltip">{validationError && <p>{validationError.message}</p>}</div>
    </>
  );
};

export default Input;
