import './event-details-page.css';
import Header from '../components/views/Header';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton'
import {retrieveEventInfo, updateEvent} from '../integration/eventIntegration';
import {thisUser} from '../index';
import {listRides} from '../integration/eventIntegration';
import Ride from '../components/views/Ride'


function EventDetailsPage() {
    const params = useParams();
    const eventCode = params.eventCode;
    const [canAccess, setCanAccess] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [rideList, setrideList] = useState([]);  



    const [info, setInfo] = useState({
        eventCode: "",
        riderLink: "",
    })

    const [editableInfo, setEditableInfo] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        radius: ""
    })

    useEffect(() => {
        async function check(){
            if(!canAccess){
                if(thisUser.getUserEmail() !== ""){
                    setCanAccess(true);
                    const res = await retrieveEventInfo(eventCode);
                    if(res.status === "success"){
                        setInfo({eventCode: eventCode, riderLink: `localhost:3000/ride-request/${eventCode}`});
                        setEditableInfo({name: res.info.event_name, address: res.info.address, city: res.info.city, state: res.info.state, zip: res.info.zip, radius: res.info.ride_max_radius});
                    }
                }
            }
        }
        check();
    }, [eventCode, canAccess])

    useEffect(() => {
        listRides(thisUser.getUserEmail()).then(d => {setrideList(d.rides)});
      }, [])



    const handleNameChange = (event) => {
        setEditableInfo({...editableInfo, name: event.target.value})
    }

    const handleAddressChange = (event) => {
        setEditableInfo({...editableInfo, address: event.target.value})
    }

    const handleCityChange = (event) => {
        setEditableInfo({...editableInfo, city: event.target.value})
    }

    const handleStateChange = (event) => {
        setEditableInfo({...editableInfo, state: event.target.value})
    }

    const handleZipChange = (event) => {
        setEditableInfo({...editableInfo, zip: event.target.value})
    }
    
    const handleRadiusChange = (event) => {
        setEditableInfo({...editableInfo, radius: event.target.value})
    }

    const handleEditPressed = async (event) => {
        event.preventDefault();
        setCanEdit(true);
    }

    const handleSubmitted = async (event) => {
        event.preventDefault();
        const res = await updateEvent(info.eventCode, editableInfo.name, editableInfo.address, editableInfo.city, editableInfo.state, editableInfo.zip, editableInfo.radius);
        if(res.status !== "success"){
            return;
        }
        setCanEdit(false);
    }

    return (
    <div>
    <Header />
    <div className='backgroundEventDetailsContainer'>
        <div className='eventDetailsBubble'>
        <div className='eventDetailsTitle'>
            {canEdit ? <input onChange={handleNameChange} defaultValue={editableInfo.name}></input> : <text className='eventDetailsTitleText'>{editableInfo.name}</text>}
        </div>
        <div>
            <br></br>
            <text className='eventDetailsEventCode'><b>EVENT CODE:</b> {info.eventCode}</text>
            <text className='eventDetailsRiderLink'><b>RIDER LINK:</b> {info.riderLink}</text>
        </div>
        <div className='eventDetailsContent'>
            <div className='eventDetailsContentText'>
                <br></br>
                <text className='eventDetailsAddress'><b>ADDRESS:</b></text>
                <br></br>

                {canEdit ? <text>&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={handleAddressChange} defaultValue={editableInfo.address}></input>,</text> : <text className='eventDetailsAddressInfo'>&nbsp;&nbsp;&nbsp;&nbsp;{editableInfo.address},</text>}
                {canEdit ? <text><br></br>&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={handleCityChange} defaultValue={editableInfo.city}></input>,</text> : <text className='eventDetailsAddressInfo'><br></br>&nbsp;&nbsp;&nbsp;&nbsp;{editableInfo.city},</text>}
                {canEdit ? <text><br></br>&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={handleStateChange} defaultValue={editableInfo.state}></input></text> : <text className='eventDetailsAddressInfo'><br></br>&nbsp;&nbsp;&nbsp;&nbsp;{editableInfo.state}</text>}
                {canEdit ? <text><br></br>&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={handleZipChange} defaultValue={editableInfo.zip}></input></text> : <text className='eventDetailsAddressInfo'><br></br>&nbsp;&nbsp;&nbsp;&nbsp;{editableInfo.zip}</text>}

                <br></br><br></br>
                <text className='eventDetailsAddress'><b>MAX RIDE RADIUS:</b> </text> {canEdit ? <text> <input onChange={handleRadiusChange} defaultValue={editableInfo.radius}></input> miles</text> : <text className='eventDetailsAddressInfo'> {editableInfo.radius} miles</text>}
            </div>
            <div className='eventDetailsContentMap'>
                <br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <text>&#91;MAP WILL GO HERE&#93;</text>
            </div>
        </div>
        <div>
            {canEdit ? <GenericSubmitButton onClickFunction={handleSubmitted}/> : <button className='eventDetailsEditButton' onClick={handleEditPressed}>EDIT</button>}
        </div>
        </div>
    </div>
    <br></br>
    <div>
    {rideList ? <div className='rideList'>{rideList.map((element) => {return Ride(element.rider_name, element.needs_ride, element.in_ride, element.eta, element.group_size)})}</div> : null}
    </div>
    </div>
);
}
export default EventDetailsPage;