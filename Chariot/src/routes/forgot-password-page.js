import {useState} from 'react';
import './forgot-password-page.css';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { useNavigate } from 'react-router-dom';
import HeaderBlank from '../components/views/HeaderBlank';
import { changeEventOrganizerPasswordRequest, checkEventOrganizerExists, changeEventOrganizerPasswordSubmit } from '../integration/eventOrganizerIntegration';

function ForgotPasswordPage() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        email: "",
        token: "",
        newPassword: "",
    })

    const [submitted, setSubmitted] = useState(false);

    const isValidEmail = async (emailToCheck) => {
        const res = await checkEventOrganizerExists(emailToCheck);
        if(res.status === "success"){
            return true;
        }
        return false;
    }

    const handleEmailChange = (event) => {
        setInfo({...info, email: event.target.value})
    }

    const handleTokenChange = (event) => {
        setInfo({...info, token: event.target.value})
    }

    const handleNewPasswordChange = (event) => {
        setInfo({...info, newPassword: event.target.value})
    }

    const handleSubmitted = async (event) => {
        event.preventDefault();
        if(info.token === ""){ //if the email has not yet been sent
            if(isValidEmail(info.email)){
                const res = await changeEventOrganizerPasswordRequest(info.email);
                if(res.status === "success"){
                    setSubmitted(true);
                }
            }
        } else {
            const res = await changeEventOrganizerPasswordSubmit(info.token, info.newPassword);
            if(res.status === "success"){
                navigate('../signInPage/');
            };
        }
    }

    return (
    <body>
    <HeaderBlank />
    <div className="container">
    <h1>Forgot Password</h1>
    <form className='form'>
        <label>Email</label><br></br>
        <input onChange={handleEmailChange} type="text" name="email" value={info.email}></input><br></br>
        <GenericSubmitButton onClickFunction={handleSubmitted} />
        {submitted ? <div>Email Delivered <br></br> 
        <label>Token</label><br></br>
        <input onChange={handleTokenChange} type="text" name="token" value={info.token}></input><br></br>
        <label>New Password</label><br></br>
        <input onChange={handleNewPasswordChange} type="text" name="newPassword" value={info.newPassword}></input><br></br></div> : null}
    </form>
    </div>
    </body>
    );
}
export default ForgotPasswordPage;