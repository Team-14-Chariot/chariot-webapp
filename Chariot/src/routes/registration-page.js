import {useEffect, useState} from 'react';
import './registration-page.css';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { useNavigate } from 'react-router-dom';
import Header from '../components/views/Header';

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
    }

    useEffect(() => {
        console.log(submitted + " " + correctEmailFormat + " " + correctPasswordFormat);
        if(submitted && correctEmailFormat && correctPasswordFormat){
            console.log("submitted");
            setSubmitted(true);
            navigate('/');
        }
    }, [correctEmailFormat, correctPasswordFormat, submitted, navigate]);

    return (
    <body>
    <Header />
    <div className="container">
        <h1>Registration</h1>
        <form>
            <label>Email</label><br></br>
            <input onChange={handleEmailChange} type="text" name="email" value={info.email}></input><br></br>
            {!correctEmailFormat ? <div className='errorMessage'>Make sure you input a real email.</div> : null}
            <label>Password</label><br></br>
            <input onChange={handlePasswordChange} type="text" name="password" value={info.password}></input>
            {!correctPasswordFormat ? <div className='errorMessage'>Make sure your password is at<br></br> least 7 characters.</div> : null}
            <br></br><br></br>
            <GenericSubmitButton onClickFunction={handleSubmitted} />
            {submitted ? <div>Successfully Registered!</div> : null}
        </form>
    </div>
    </body>
    );
}
export default RegistrationPage;