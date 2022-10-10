import {useEffect, useState} from 'react';
import './registration-page.css';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { useNavigate } from 'react-router-dom';
import HeaderBlank from '../components/views/HeaderBlank';
import {thisUser} from '../index';

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
        if(info.password.length < 7){
            setCorrectPasswordFormat(false);
        } else {
            setCorrectPasswordFormat(true);
        }
        setSubmitted(true);
    }

    useEffect(() => {
        console.log(submitted + " " + correctEmailFormat + " " + correctPasswordFormat);
        if(submitted && correctEmailFormat && correctPasswordFormat){
            console.log("submitted");
            thisUser.setSignedIn(true);
            thisUser.setUserEmail(info.email);
            navigate('/');
        }
    }, [correctEmailFormat, correctPasswordFormat, submitted, navigate, info.email]);

    return (
    <body>
    <HeaderBlank />
    <div className="container">
        <h1>Registration</h1>
        <form className='form'>
            <label>Email</label><br></br>
            <input onChange={handleEmailChange} type="text" name="email" value={info.email}></input><br></br>
            {!correctEmailFormat ? <div className='errorMessage'>Make sure you input a real email.</div> : null}
            <label>Password</label><br></br>
            <input onChange={handlePasswordChange} type="text" name="password" value={info.password}></input>
            {!correctPasswordFormat ? <div className='errorMessage'>Make sure your password is at<br></br> least 7 characters.</div> : null}
            <br></br><br></br>
            <GenericSubmitButton onClickFunction={handleSubmitted} />
        </form>
    </div>
    </body>
    );
}
export default RegistrationPage;