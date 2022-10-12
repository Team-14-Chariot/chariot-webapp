import './SignedInText.css';

const SignedInText = (userEmail) => {
return(
 <div className="text">
    Signed in as:<br></br>
    {userEmail}
 </div>
)
}
export default SignedInText;