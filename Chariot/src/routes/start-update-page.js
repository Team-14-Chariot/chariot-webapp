import {useEffect, useState} from 'react';
import './start-update-page.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/views/Header';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { thisUser } from '../index';
import { changeEventOrganizerEmail } from '../integration/eventOrganizerIntegration';

function StartUpdatePage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState({
        email: "",
    })

    const [submitted, setSubmitted] = useState(false);
    const [correctEmailFormat, setCorrectEmailFormat] = useState(true);
    

    //const isValidEmail = (emailToCheck) => {
        //backend call to check if email exists
        //return true;
    //}

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
    const [rerender, setRerender] = useState(0);
    useEffect(() => {
        thisUser.setSignedIn(window.localStorage.getItem('thisUserSignedIn'));
        thisUser.setUserEmail(window.localStorage.getItem('thisUserEmail'));
        thisUser.setUserToken(window.localStorage.getItem('thisUserToken'));
        thisUser.setUserId(window.localStorage.getItem('thisUserId'));
        setRerender(rerender + 1);
    }, [rerender]);

    useEffect(() => {
        async function attemptEmailChange(){
            console.log(submitted + " " + correctEmailFormat);
            console.log(email.email);
            console.log(thisUser.getUserEmail());
            if(submitted && correctEmailFormat){
                //if(checkEventOrganizerExists(thisUser.getUserEmail()).status !== "success") {
                    //this user already exists and we change the email
                    //return;
                //};
                const res = await changeEventOrganizerEmail(email.email);
                if(res.status === "success"){

                }
                thisUser.setUserEmail(email.email);

            }
        } 
    attemptEmailChange();
    }, [correctEmailFormat, submitted, navigate, email.email]);


    return (
    <body>
    <Header />
    <div className="start_update_page_container">
    <h1>Update Email</h1>
    <form className='start_update_page_form'>
        <label>New Email</label><br></br>
        <input onChange={handleEmailChange} type="text" name="email" value={email.email}></input><br></br>
        {!correctEmailFormat ? <div className='errorMessage'>Make sure you input a real email.</div> : null}
        <GenericSubmitButton onClickFunction={handleSubmitted} />
        {submitted ? <div>Email Sent!</div> : null}
    </form>
    </div>
    </body>
    );
}
export default StartUpdatePage;