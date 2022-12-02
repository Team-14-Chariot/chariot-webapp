import {useEffect, useState} from 'react';
import './registration-page.css';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { useNavigate } from 'react-router-dom';
import HeaderBlank from '../components/views/HeaderBlank';
import {thisUser} from '../index';
import {checkEventOrganizerExists, checkEventOrganizerTupleExists, createEventOrganizer, sendVerificationEmail} from '../integration/eventOrganizerIntegration'; 

function RegistrationPage() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        email: "",
        password: "",
    })

    const [submitted, setSubmitted] = useState(false);
    const [correctEmailFormat, setCorrectEmailFormat] = useState(true);
    const [correctPasswordFormat, setCorrectPasswordFormat] = useState(true);


    const handleEmailChange = (event) => {
        setInfo({...info, email: event.target.value})
    }

    const handlePasswordChange = (event) => {
        setInfo({...info, password: event.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        if(!info.email.includes('@') || !info.email.includes('.')){
            setCorrectEmailFormat(false);
        } else {
            setCorrectEmailFormat(true);
        }
        if(info.password.length < 10){
            setCorrectPasswordFormat(false);
        } else {
            setCorrectPasswordFormat(true);
        }
        setSubmitted(true);
    }

    useEffect(() => {
        async function attemptRegister() {
            if(submitted && correctEmailFormat && correctPasswordFormat){
                if(checkEventOrganizerExists(info.email).status === "success") {
                    //this user already exists and cannot be registered;
                    return;
                };
                const res = await createEventOrganizer(info.email, info.password);
                if(res.status === "failed"){
                    //event organizer could not be created (some connection or backend error)
                    return;
                };
                const res2 = await checkEventOrganizerTupleExists(info.email, info.password);
                if(res2.status === "failed"){
                    return;
                };
                const res3 = await sendVerificationEmail(info.email);
                if(res3.status === "failed"){
                    return;
                }
                thisUser.setSignedIn(true);
                thisUser.setUserEmail(info.email);
                thisUser.setUserToken(res2.record.token);
                thisUser.setUserId(res.record.id);
                navigate('../main-page/');
            }
        }
        attemptRegister();
    }, [correctEmailFormat, correctPasswordFormat, submitted, navigate, info.email, info.password]);

    return (
    <body>
    <HeaderBlank />
    <div className="registration_page_container">
        <h1>Registration</h1>
        <form className='registration_page_form'>
            <label>Email</label><br></br>
            <input onChange={handleEmailChange} type="text" name="email" value={info.email}></input><br></br>
            {!correctEmailFormat ? <div className='registration_page_errorMessage'>Make sure you input a real email.</div> : null}
            <label>Password</label><br></br>
            <input onChange={handlePasswordChange} type="password" name="password" value={info.password}></input>
            {!correctPasswordFormat ? <div className='registration_page_errorMessage'>Make sure your password is at<br></br> least 10 characters.</div> : null}
            <br></br><br></br>
            <GenericSubmitButton onClickFunction={handleSubmitted} />
        </form>
    </div>
    </body>
    );
}
export default RegistrationPage;