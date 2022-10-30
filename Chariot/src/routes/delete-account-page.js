import {useEffect, useState} from 'react';
import './delete-account-page.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/views/Header';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { client, thisUser } from '../index';
import { checkEventOrganizerTupleExists } from '../integration/eventOrganizerIntegration';

function DeleteAccountPage() {
    const navigate = useNavigate();

    const [password, setPassword] = useState({
        password: "",
    })

    const [submitted, setSubmitted] = useState(false);
    const [correctPassword, setCorrectPassword] = useState(true);


    const handlePasswordChange = (event) => {
        setPassword({...password, password: event.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        async function attemptAccountDeletion(){
            const res = await checkEventOrganizerTupleExists(thisUser.getUserEmail(), password.password);
            console.log(res);
            if (res.status === "sucsess"){
                setCorrectPassword(true);
            } else {
                setCorrectPassword(false);
                console.log(thisUser.getUserEmail());
                console.log(password.password);
            }
        }
        setSubmitted(true);
        attemptAccountDeletion();
    }

    useEffect(() => {
        async function deleteAccount(){
            if(submitted && correctPassword){
                const res = await client.users.delete(thisUser.getUserId);
                if (res.status === 'success') {
                    thisUser.setSignedIn(false);
                    thisUser.setUserEmail(null);
                    thisUser.setUserId(null);
                    navigate("/");
                } else {
                    return;
                }
            }
        }
        deleteAccount();
    }, [correctPassword, submitted, navigate]);


    return (
    <body>
    <Header />
    <div className='delete_account_page_container'>
    <h1>Delete Account</h1>
    <form className='delete_account_page_form'>
        <label>Enter Your Password</label><br></br>
        <input onChange={handlePasswordChange} type="text" name="password" value={password.password}></input><br></br>
        {!correctPassword ? <div className='errorMessage'>Your password doesn't match.</div> : null}
        <GenericSubmitButton onClickFunction={handleSubmitted} />
        {submitted ? <div>Email Sent!</div> : null}
    </form>
    </div>
    </body>
    );
}
export default DeleteAccountPage;