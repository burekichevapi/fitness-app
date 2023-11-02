
const LoginButton = ({ onClickHandler, buttonText }) =>
  <button className="btn btn-secondary" onClick={onClickHandler}>
    {buttonText}
  </button>

export default LoginButton;