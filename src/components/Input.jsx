const Input = ({ register, name, label, options, errors }) => {
  const inputType = ['password', 'confirmPassword'].includes(name)
    ? 'password'
    : 'text';

  return (
    <>
      <label>{label}:</label>
      <input type={inputType} {...register(name, options)} />
      <div className="tooltip">{errors && <p>{errors.message}</p>}</div>
    </>
  );
};

export default Input;
