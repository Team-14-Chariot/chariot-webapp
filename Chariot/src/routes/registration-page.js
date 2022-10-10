import {useState} from 'react';
import './page1.css';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        email: "",
        password: "",
    })

    const [submitted, setSubmitted] = useState(false);

    const handleEmailChange = (event) => {
        setInfo({...info, email: event.target.value})
    }

    const handlePasswordChange = (event) => {
        setInfo({...info, password: event.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        if(info.email > 8 && info.password > 8){
            setSubmitted(true);
            navigate('/rider-link');
        }
    }

    return (
    <div className="container">
    <h1>Registration</h1>
    <form>
        <label>Email</label><br></br>
        <input onChange={handleEmailChange} type="text" name="email" value={info.email}></input><br></br>
        <label>Password</label><br></br>
        <input onChange={handlePasswordChange} type="text" name="password" value={info.password}></input><br></br><br></br>
        <GenericSubmitButton onClickFunction={handleSubmitted} />
        {submitted ? <div>Successfully Registered!</div> : null}
    </form>
    </div>
    );
}
export default RegistrationPage;