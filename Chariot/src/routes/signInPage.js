import {useEffect, useState} from 'react';
import './signInPage.css';
import SignInConfirmButton from '../components/buttons/SignInConfirmButton';
import { useNavigate } from 'react-router-dom';
import SignUpButton from '../components/buttons/SignUpButton';
import HeaderBlank from '../components/views/HeaderBlank';
import {thisUser} from '../index';
import {checkEventOrganizerTupleExists} from '../integration/eventOrganizerIntegration';

function SignInPage() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        userEmail: "",
        userPassword: "",
    })



    const [submitted, setSubmitted] = useState(false);
    const [correctEmailAndPassword, setCorrectEmailAndPassword] = useState(false);

    const handleEmailChange = (event) => {
        setInfo({...info, userEmail: event.target.value})
    }

    const handlePasswordChange = (event) => {
        setInfo({...info, userPassword: event.target.value})
    }

    const handleSubmitted = async (event) => {
        event.preventDefault();
        const ans = await checkEventOrganizerTupleExists(info.userEmail, info.userPassword);
        if(ans.status === "success"){
            setCorrectEmailAndPassword(true);
        }
        setSubmitted(true);
    }

    useEffect(() => {
        //this is where we send information to the backend and check if email and password are correct.
        async function setup () {
            const ans = await checkEventOrganizerTupleExists(info.userEmail, info.userPassword);
        if (submitted && correctEmailAndPassword){
            console.log(ans);
            setSubmitted(true);
            thisUser.setSignedIn(true);
            thisUser.setUserEmail(info.userEmail);
            thisUser.setUserToken(ans.record.token);
            thisUser.setUserId(ans.record.user.id);
            navigate('../main-page/');
        }
        }
        setup();
    }, [submitted, correctEmailAndPassword, navigate, info.userEmail, info.userPassword]);

    const Resetpassword = (event) => {

        navigate('../forgot-password/');
      
      }

    return (
    <body>
    <HeaderBlank />
    <div className="sign_in_page_container">
    <h1>LOGIN</h1>
    <form className='sign_in_page_form'>
        <label>Email</label><br></br>
        <input onChange={handleEmailChange} type="text" name="email" value={info.userEmail}></input><br></br>
        <label>Password</label><br></br>
        <input onChange={handlePasswordChange} type="text" name="password" value={info.userPassword}></input><br></br>
        <label onClick={Resetpassword}><u>Forgot Password?</u></label><br></br>
        <div className='logInButtonContainer'>
        <SignInConfirmButton onClickFunction={handleSubmitted} />
        {!correctEmailAndPassword && submitted ? <div className='signin_errorMessage'>Your email or password is incorrect</div> : null}
        </div>
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