import './SignInButton.css';

const goToHomepage = () => {
    console.log("move to users homepage");
}
const SignInConfirmButton = () => {
return(
 <div className="button-container">
  <button className={`custom-button`} onClick={goToHomepage}>SIGN IN</button>
 </div>
)
}
export default SignInConfirmButton;