import './SignInButton.css';

const registerNewUser = () => {
    console.log("move to users homepage");
}
const SignUpButton = () => {
return(
 <div className="button-container">
  <button className={`custom-button`} onClick={registerNewUser}>SIGN UP</button>
 </div>
)
}
export default SignUpButton;