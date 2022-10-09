import {useState} from 'react';
import './signInPage.css';
import SignInConfirmButton from '../components/buttons/SignInConfirmButton';
import { useNavigate } from 'react-router-dom';
import SignUpButton from '../components/buttons/SignUpButton';
import HeaderBlank from '../components/views/HeaderBlank';

function SignInPage() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        userEmail: "",
        userPassword: "",
    })

    const [submitted, setSubmitted] = useState(false);

    const handleEmailChange = (event) => {
        setInfo({...info, userEmail: event.target.value})
    }

    const handlePasswordChange = (event) => {
        setInfo({...info, userPassword: event.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        setSubmitted(true);
        //this is where we send information to the backend and check if email and password are correct.
        navigate('/');
        
        /*if(info.email > 8 && info.password > 8){
            setSubmitted(true);
            navigate('/');
        }*/
    }

    return (
    <body>
        <HeaderBlank />
        <div className="container">
        <h1>LOGIN</h1>
        <form>
            <label>Email</label><br></br>
            <input onChange={handleEmailChange} type="text" name="email" value={info.userEmail}></input><br></br>
            <label>Password</label><br></br>
            <input onChange={handlePasswordChange} type="text" name="password" value={info.userPassword}></input><br></br><br></br>
            <div className='logInButtonContainer'>
            <SignInConfirmButton onClickFunction={handleSubmitted} />
            </div>
            {submitted ? <div>Successfully Logged In!</div> : null}
        </form>
        <div className='newUserContainer'>
            New User?
        </div>
        <div className='signInButtonContainer'>
            <SignUpButton/>
        </div>
        </div>
    </body>
    );
}
export default SignInPage;