import './GenericSubmitButton.css';

const SignInConfirmButton = ({onClickFunction}) => {
return(
 <div className="button-container">
  <button className={`custom-button`} onClick={onClickFunction}>LOGIN</button>
 </div>
)
}
export default SignInConfirmButton;