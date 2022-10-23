import './event-details-page.css';
import Header from '../components/views/Header';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton'
import SelectUSState from 'react-select-us-states';
import {retrieveEventInfo, updateEvent} from '../integration/eventIntegration';
import {thisUser} from '../index';


function EventDetailsPage() {
    const params = useParams();
    const eventCode = params.eventCode;
    const [canAccess, setCanAccess] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

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
        setEditableInfo({...editableInfo, state: event})
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
            {canEdit ? <GenericSubmitButton onClickFunction={handleSubmitted}/> : <button className='eventDetailsEditButton' onClick={handleEditPressed}>EDIT</button>}
        </div>
        </div>
    </div>
    </div>
);
}
export default EventDetailsPage;