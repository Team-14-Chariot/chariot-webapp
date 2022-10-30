import {useState} from 'react';
import './forgot-password-page.css';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import HeaderBlank from '../components/views/HeaderBlank';
import { changeEventOrganizerPasswordRequest, checkEventOrganizerExists } from '../integration/eventOrganizerIntegration';

function ForgotPasswordPage() {

    const [info, setInfo] = useState({
        email: "",
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

    const handleSubmitted = async (event) => {
        event.preventDefault();
            if(isValidEmail(info.email)){
                const res = await changeEventOrganizerPasswordRequest(info.email);
                if(res.status === "success"){
                    setSubmitted(true);
                }
            }
    }

    return (
    <body>
    <HeaderBlank />
    <div className="forgot_password_page_container">
    <h1>Forgot Password</h1>
    <form className='form'>
        <label>Email</label><br></br>
        <input onChange={handleEmailChange} type="text" name="email" value={info.email}></input><br></br>
        <GenericSubmitButton onClickFunction={handleSubmitted} />
        {submitted ? <div>Email Delivered <br></br> </div> : null}
    </form>
    </div>
    </body>
    );
}
export default ForgotPasswordPage;