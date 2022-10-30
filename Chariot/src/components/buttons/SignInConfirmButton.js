import './SignInConfirmButton.css';

const SignInConfirmButton = ({onClickFunction}) => {
return(
 <div className="button-container">
  <button className={`login-button`} onClick={onClickFunction}>LOGIN</button>
 </div>
)
}
export default SignInConfirmButton;