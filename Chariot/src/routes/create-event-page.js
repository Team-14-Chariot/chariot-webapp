import './create-event-page.css';
import Header from '../components/views/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton'


function CreateEventPage() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        name: "",
        address: "",
        radius: ""
    })

    const [submitted, setSubmitted] = useState(false);

    const handleNameChange = (event) => {
        setInfo({...info, name: event.target.value})
    }

    const handleAddressChange = (event) => {
        setInfo({...info, address: event.target.value})
    }
    
    const handleRadiusChange = (event) => {
        setInfo({...info, radius: event.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        setSubmitted(true);
        navigate('../main-page/')
    }

    return (
    <body>
    <Header />
    <div className="container">
        <h1>Register Your Event</h1>
        <form className='eventForm'>
            <label>EVENT NAME: </label>
            <input onChange={handleNameChange} type="text" name="name" value={info.name}></input><br></br>
            <label>EVENT ADDRESS: </label>
            <input onChange={handleAddressChange} type="text" name="address" value={info.address}></input><br></br>
            <label>MAX PICKUP RADIUS: </label>
            <input onChange={handleRadiusChange} type="text" name="radius" value={info.radius}></input>  MILES
            <br></br><br></br>
            <GenericSubmitButton onClickFunction={handleSubmitted} />
            {submitted ? <div>Successfully Created!</div> : null}
        </form>
    </div>
    </body>
);
}
export default CreateEventPage;