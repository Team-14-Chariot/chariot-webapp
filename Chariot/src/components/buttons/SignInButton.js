import './SignInButton.css';

const startRegistration = () => {
    console.log("chariot");
}
const SignInButton = () => {
return(
 <div className="button-container">
  <button className={`custom-button`} onClick={startRegistration}>SIGN IN</button>
 </div>
)
}
export default SignInButton;