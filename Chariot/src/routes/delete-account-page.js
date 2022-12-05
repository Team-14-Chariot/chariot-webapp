import {useState, useEffect} from 'react';
import './delete-account-page.css';
import { useNavigate } from 'react-router-dom';
import Header from '../components/views/Header';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { thisUser, client } from '../index';
import { checkEventOrganizerTupleExists } from '../integration/eventOrganizerIntegration';

function DeleteAccountPage() {
    const navigate = useNavigate();

    const [password, setPassword] = useState({
        password: "",
    })

    const [submitted, setSubmitted] = useState(false);
    const [correctPassword, setCorrectPassword] = useState(false);


    const handlePasswordChange = (event) => {
        setPassword({...password, password: event.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        async function checkForPassword(){
            const res = await checkEventOrganizerTupleExists(thisUser.getUserEmail(), password.password);
            if (res.status === "success"){
                setCorrectPassword(true);
                console.log("correct password");
            } else {
                setCorrectPassword(false);
                console.log("incorrect password");
            }
        }
        checkForPassword();
        setSubmitted(true);
    }

    useEffect(() => {
        async function attemptAccountDeletion(){
            if(correctPassword && submitted){
                //have to delete all events
                //filter the events by owner 
                const eventsToDelete = await client.records.getList('events', 1, 100, {filter: `owner = "${thisUser.getUserId()}"`});
                const items = eventsToDelete.items;
                //go through list and delete every event
                //console.log(eventsToDelete);
                for (let i = 0; i < items.length; i++) {
                    console.log(items[i].id);
                    await client.records.delete('events', items[i].id);
                }
                // finally delete the actual user
                try{
                    await client.users.delete(thisUser.getUserId());
                    thisUser.setSignedIn(false);
                    thisUser.setUserEmail("");
                    thisUser.setUserId("");
                    window.localStorage.setItem('thisUserSignedIn', thisUser.getSignedIn());
                    window.localStorage.setItem('thisUserEmail', thisUser.getUserEmail());
                    window.localStorage.setItem('thisUserToken', thisUser.getUserToken());
                    window.localStorage.setItem('thisUserId', thisUser.getUserId());
                    navigate("/");
                } catch (e) {
                    return;
                }
            }
        }
        attemptAccountDeletion();

    }, [submitted, correctPassword]);

    const [rerender, setRerender] = useState(0);
        thisUser.setSignedIn(window.localStorage.getItem('thisUserSignedIn'));
        thisUser.setUserEmail(window.localStorage.getItem('thisUserEmail'));
        thisUser.setUserToken(window.localStorage.getItem('thisUserToken'));
        thisUser.setUserId(window.localStorage.getItem('thisUserId'));

    

    return (
    <body>
    <Header />
    <div className='delete_account_page_container'>
    <h1>Delete Account</h1>
    <form className='delete_account_page_form'>
        <label>Enter Your Password</label><br></br>
        <input onChange={handlePasswordChange} type="password" name="password" value={password.password}></input><br></br>
        <GenericSubmitButton onClickFunction={handleSubmitted} />
        {!correctPassword && submitted ? <div className='errorMessage'>Your password doesn't match.</div> : null}
    </form>
    </div>
    </body>
    );
}
export default DeleteAccountPage;