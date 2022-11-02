import './SignedInText.css';

const SignedInText = (userEmail) => {
return(
 <div className="signed_in_text">
    Signed in as:<br></br>
    {userEmail}
 </div>
)
}
export default SignedInText;