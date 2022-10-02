import './GenericSubmitButton.css';

const SignInButton = ({onClickFunction}) => {
return(
 <div className="button-container">
  <button className={`custom-button`} onClick={onClickFunction}>SUBMIT</button>
 </div>
)
}
export default SignInButton;