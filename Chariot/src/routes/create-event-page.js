import './create-event-page.css';
import Header from '../components/views/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
        radius: 0,
        riderPassword: "",
        driverPassword: ""
    })

    const [submitted, setSubmitted] = useState(false);
    const [correctEventName, setCorrectEventName] = useState(true);
    const [correctEventAddr, setCorrectEventAddr] = useState(true);
    const [correctEventCity, setCorrectEventCity] = useState(true);
    const [correctEventZip, setCorrectEventZip] = useState(true);
    const [correctEventRadius, setCorrectEventRadius] = useState(true);

    


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
    }

    const handleZipChange = (event) => {
        setInfo({...info, zip: event.target.value})
    }
    
    const handleRadiusChange = (event) => {
        setInfo({...info, radius: event.target.value})
    }

    const handleRiderPasswordChange = (event) => {
        setInfo({...info, riderPassword: event.target.value})
    }

    const handleDriverPasswordChange = (event) => {
        setInfo({...info, driverPassword: event.target.value})
    }

    const handleSubmitted = async (event) => {
        event.preventDefault();
        if(info.name === ""){
            setCorrectEventName(false);
        } else {
            setCorrectEventName(true);
        }
        if(/(\d+ .+)|(\d+-\d+ .+)/.test(info.address)){
            setCorrectEventAddr(true);
        } else {
            setCorrectEventAddr(false);
        }
        if(/^([a-zA-Z]+)(\s|-|[a-zA-Z])+$/.test(info.city)){
            setCorrectEventCity(true);
        } else {
            setCorrectEventCity(false);
        }
        if(/^[0-9]{5}$/.test(info.zip)){
            setCorrectEventZip(true);
        } else {
            setCorrectEventZip(false);
        }
        if(info.radius <= 0){
            setCorrectEventRadius(false);
        } else {
            setCorrectEventRadius(true);
        }
        setSubmitted(true);
        
    }

    useEffect(() => {
        async function attemptCreateEvent() {
            if(submitted && correctEventName && correctEventAddr && correctEventCity && correctEventZip){
                const res = await createEvent(info.name, info.address, info.city, info.state, info.zip, info.radius, info.riderPassword, info.driverPassword, thisUser.getUserId());
                if(res.status !== "success"){
                    return;
                }
                //go to the backend
                navigate('../main-page/')
            }
        }
        attemptCreateEvent();
    }, [info.name, info.address, info.city, info.state, info.zip, info.radius, info.riderPassword, info.driverPassword, navigate, correctEventAddr, correctEventCity, correctEventName, correctEventZip, submitted])

    return (
    <body>
    <Header />
    <div className="create_event_page_container">
        <h1>Register Your Event</h1>
        <form className='eventForm'>
            <label>EVENT NAME: </label>
            <input onChange={handleNameChange} type="text" name="name" value={info.name}></input><br></br>
            {!correctEventName ? <div className='create_event_page_errorMessage'>Make sure you input an event name.</div> : null}
            <label>ADDRESS LINE 1: </label>
            <input onChange={handleAddressChange} type="text" name="address" value={info.address}></input><br></br>
            {!correctEventAddr ? <div className='create_event_page_errorMessage'>Make sure you input a real address line.</div> : null}
            <label>CITY: </label>
            <input onChange={handleCityChange} type="text" name="city" value={info.city}></input><br></br>
            {!correctEventCity ? <div className='create_event_page_errorMessage'>Make sure you input a real city.</div> : null}
            <label>STATE: </label>
            <SelectUSState onChange={handleStateChange} /><br></br>
            <label>ZIP CODE: </label>
            <input onChange={handleZipChange} type="text" name="zip" value={info.zip}></input><br></br>
            {!correctEventZip ? <div className='create_event_page_errorMessage'>Make sure you input a real zipcode.</div> : null}
            <label>MAX PICKUP RADIUS: </label>
            <input onChange={handleRadiusChange} type="number" name="radius" value={info.radius}></input>  MILES<br></br>
            {!correctEventRadius ? <div className='create_event_page_errorMessage'>Make sure you input a radius greater than zero.</div> : null}
            <label>RIDER PASSWORD &#40;optional&#41;: </label>
            <input onChange={handleRiderPasswordChange} type="text" value={info.riderPassword}></input>
            <label>DRIVER PASSWORD &#40;optional&#41;: </label>
            <input onChange={handleDriverPasswordChange} type="text" value={info.driverPassword}></input>
            <br></br><br></br>
            <GenericSubmitButton onClickFunction={handleSubmitted} />
        </form>
    </div>
    </body>
);
}
export default CreateEventPage;