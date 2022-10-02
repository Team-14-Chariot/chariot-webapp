import './SignInButton.css';
import { useNavigate } from 'react-router-dom';

function SignInButton(){
    const navigate = useNavigate();

    const startRegistration = () => {
        navigate('signInPage/');
    }
        
    return(
    <div className="button-container">
    <button className={`custom-button`} onClick={startRegistration}>SIGN IN</button>
    </div>
    )
}
export default SignInButton;