import {useState} from 'react';
import './start-update-page.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/views/Header';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { thisUser } from '..';

function StartUpdatePage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState({
        email: "",
    })

    const [submitted, setSubmitted] = useState(false);
    const [correctEmailFormat, setCorrectEmailFormat] = useState(true);

    const isValidEmail = (emailToCheck) => {
        //backend call to check if email exists
        return true;
    }

    const handleEmailChange = (event) => {
        setEmail({...email, email: event.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        if(!email.email.includes('@') || !email.email.includes('.')){
            setCorrectEmailFormat(false);
        } else {
            setCorrectEmailFormat(true);
        }
        setSubmitted(true);
    }

    useEffect(() => {
        console.log(submitted + " " + correctEmailFormat);
        if(submitted && correctEmailFormat){
            if(checkEventOrganizerExists(thisUser.getUserEmail).status === "success") {
                //this user already exists and we change the email
                thisUser.setUserEmail(email.email);
            };
        }
    }, [correctEmailFormat, submitted, navigate, email.email]);


    return (
    <body>
    <Header />
    <div className="container">
    <h1>Update Email</h1>
    <form className='form'>
        <label>New Email</label><br></br>
        <input onChange={handleEmailChange} type="text" name="email" value={email.email}></input><br></br>
        {!correctEmailFormat ? <div className='errorMessage'>Make sure you input a real email.</div> : null}
        <GenericSubmitButton onClickFunction={handleSubmitted} />
    </form>
    </div>
    </body>
    );
}
export default StartUpdatePage;