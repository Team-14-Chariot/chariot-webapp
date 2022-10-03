import './SignInButton.css';
import { useNavigate } from 'react-router-dom';


function SignUpButton () {
    const navigate = useNavigate();

    const registerNewUser = () => {
        navigate('../register/');
    }

return(
 <div className="button-container">
  <button className={`custom-button`} onClick={registerNewUser}>SIGN UP</button>
 </div>
)
}
export default SignUpButton;