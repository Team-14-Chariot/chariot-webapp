import {useState} from 'react';
import './forgot-password-page.css';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { useNavigate } from 'react-router-dom';
import HeaderBlank from '../components/views/HeaderBlank';

function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState({
        email: "",
    })

    const [submitted, setSubmitted] = useState(false);

    const isValidEmail = (emailToCheck) => {
        //backend call to check if email exists
        return true;
    }

    const handleEmailChange = (event) => {
        setEmail({...email, email: event.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        if(isValidEmail(email.email)){
            setSubmitted(true);
            navigate('/');
        }
    }

    return (
    <body>
    <HeaderBlank />
    <div className="container">
    <h1>Forgot Password</h1>
    <form>
        <label>Email</label><br></br>
        <input onChange={handleEmailChange} type="text" name="email" value={email.email}></input><br></br>
        <GenericSubmitButton onClickFunction={handleSubmitted} />
        {submitted ? <div>Email Delivered</div> : null}
    </form>
    </div>
    </body>
    );
}
export default ForgotPasswordPage;