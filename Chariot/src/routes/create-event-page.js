import './create-event-page.css';
import Header from '../components/views/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton'
import SelectUSState from 'react-select-us-states';
import {createEvent} from '../integration/eventIntegration';
import {thisUser} from '../index';


function CreateEventPage() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        radius: ""
    })

    


    const handleNameChange = (event) => {
        setInfo({...info, name: event.target.value})
    }

    const handleAddressChange = (event) => {
        setInfo({...info, address: event.target.value})
    }

    const handleCityChange = (event) => {
        setInfo({...info, city: event.target.value})
    }

    const handleStateChange = (event) => {
        setInfo({...info, state: event})
        console.log(event);
        //console.log(info.state);
        //console.log(newValue);
        //this.setNewValue;
    }

    const handleZipChange = (event) => {
        setInfo({...info, zip: event.target.value})
    }
    
    const handleRadiusChange = (event) => {
        setInfo({...info, radius: event.target.value})
    }

    const handleSubmitted = async (event) => {
        event.preventDefault();
        console.log(thisUser.getUserId());
        const res = await createEvent(thisUser.getUserEmail, info.name, info.address, info.city, info.state, info.zip, info.radius, thisUser.getUserId());
        if(res.status !== "success"){
            return;
        }
        //go to the backend
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
            <label>ADDRESS LINE 1: </label>
            <input onChange={handleAddressChange} type="text" name="address" value={info.address}></input><br></br>
            <label>CITY: </label>
            <input onChange={handleCityChange} type="text" name="city" value={info.city}></input><br></br>
            <label>STATE: </label>
            <SelectUSState onChange={handleStateChange} /><br></br>
            <label>ZIP CODE: </label>
            <input onChange={handleZipChange} type="text" name="zip" value={info.zip}></input><br></br>
            <label>MAX PICKUP RADIUS: </label>
            <input onChange={handleRadiusChange} type="text" name="radius" value={info.radius}></input>  MILES
            <br></br><br></br>
            <GenericSubmitButton onClickFunction={handleSubmitted} />
        </form>
    </div>
    </body>
);
}
export default CreateEventPage;