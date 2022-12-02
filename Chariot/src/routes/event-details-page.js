import './event-details-page.css';
import Header from '../components/views/Header';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton'
import {retrieveEventInfo, updateEvent, getDriversAndRides, listDrivers /*listRides*/} from '../integration/eventIntegration';
import {thisUser, client} from '../index';
import Ride from '../components/views/Ride'
import Map from '../components/views/Map';


function EventDetailsPage() {
    const params = useParams();
    const eventCode = params.eventCode;
    const [canAccess, setCanAccess] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [ridesList, setRidesList] = useState([]);
    const [driverList, setDriversList] = useState([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    

    const getDrivers = async () => {
        const res = await listDrivers(eventCode);
        setDriversList(res);
        setMapLoaded(true);
    }

    
    const [numDrivers, setNumDrivers] = useState(0);
    const [numRidesCompleted, setNumRidesCompleted] = useState(0);

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
        radius: 0,
        riderPassword: "",
        driverPassword: ""
    })

    

    useEffect(() => {
        async function doStart() {
            await getDrivers();
        }
        thisUser.setSignedIn(window.localStorage.getItem('thisUserSignedIn'));
        thisUser.setUserEmail(window.localStorage.getItem('thisUserEmail'));
        thisUser.setUserToken(window.localStorage.getItem('thisUserToken'));
        thisUser.setUserId(window.localStorage.getItem('thisUserId'));
        doStart();
    }, []);

    useEffect(() => {
        async function check(){
            if(!canAccess){
                console.log(thisUser.getUserEmail());
                if(thisUser.getUserEmail() !== "" && thisUser.getUserEmail() !== undefined){
                    setCanAccess(true);
                    const res = await retrieveEventInfo(eventCode);
                    if(res.status === "success"){
                        setInfo({eventCode: eventCode, riderLink: `localhost:3000/ride-request/${eventCode}`});
                        setEditableInfo({name: res.info.eventName, address: res.info.address, city: res.info.city, state: res.info.state, zip: res.info.zip, radius: res.info.maxRadius, riderPassword: res.info.ridePassword, driverPassword: res.info.driver_password});
                    }
                }
            }
        }
        check();
    }, [eventCode, canAccess])



    /*useEffect(() => {
        listRides(eventCode).then(d => {setRidesList(d.rides[0].rides)});
      }, [eventCode])*/


    useEffect(() => {
        async function getRides(){
            try {
                const result = await client.records.getList('rides', 1, 10, {
                    filter: `event_id = "${eventCode}"`,
                });
                //console.log(result.items);
                return {status: "success", rides: result.items};
            } catch (e){
                return {status: "failed", rides: null};
            }
        }
        getRides().then(res => setRidesList(res.rides));

        async function getStats(){
            console.log("retrieve stats");
            const response = await getDriversAndRides(eventCode);
            setNumDrivers(response.numDrivers);
            setNumRidesCompleted(response.numRides);
        }        
        getStats();

    }, [eventCode])
    

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

    const handleRiderPasswordChange = (event) => {
        setEditableInfo({...editableInfo, riderPassword: event.target.value})
    }

    const handleDriverPasswordChange = (event) => {
        setEditableInfo({...editableInfo, driverPassword: event.target.value})
    }

    const handleEditPressed = async (event) => {
        event.preventDefault();
        setCanEdit(true);
    }

    const handleSubmitted = async (event) => {
        event.preventDefault();
        const res = await updateEvent(info.eventCode, editableInfo.name, editableInfo.address, editableInfo.city, editableInfo.state, editableInfo.zip, editableInfo.radius, editableInfo.riderPassword, editableInfo.driverPassword);
        if(res.status !== "success"){
            return;
        }
        setCanEdit(false);
    }

    const handleRefresh = (event) => {
        console.log("refresh1");
        event.preventDefault();
        setMapLoaded(false);
        getDrivers();
    }
    

    //{ridesList ? <div className='ridesList'>{ridesList.map((element) => {return Ride(element.rider_name, element.needs_ride, element.in_ride, element.eta, element.group_size)})}</div> : null}

    return (
    <div>
    <Header />
    {canAccess ?
    <div className='backgroundEventDetailsContainer'>
        <div className='eventDetailsBubble'>
        <div className='eventDetailsTitle'>
            {canEdit ? <input onChange={handleNameChange} defaultValue={editableInfo.name}></input> : <text className='eventDetailsTitleText'>{editableInfo.name}</text>}
        </div>
        <div className='eventSecondaryInfo'>
            <br></br>
            <text className='eventDetailsEventCode'><b>EVENT CODE:</b> {info.eventCode}</text>
            <text className='eventDetailsRiderLink'><b>RIDER LINK:</b> {info.riderLink}</text>
        </div>
        <div className='eventDetailsContent'>
            <div className='eventDetailsContentText'>
                
                <text className='eventDetailsAddress'><b>ADDRESS:</b></text>
                <br></br>

                {canEdit ? <text>&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={handleAddressChange} defaultValue={editableInfo.address}></input>,</text> : <text className='eventDetailsAddressInfo'>&nbsp;&nbsp;&nbsp;&nbsp;{editableInfo.address},</text>}
                {canEdit ? <text><br></br>&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={handleCityChange} defaultValue={editableInfo.city}></input>,</text> : <text className='eventDetailsAddressInfo'><br></br>&nbsp;&nbsp;&nbsp;&nbsp;{editableInfo.city},</text>}
                {canEdit ? <text><br></br>&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={handleStateChange} defaultValue={editableInfo.state}></input></text> : <text className='eventDetailsAddressInfo'><br></br>&nbsp;&nbsp;&nbsp;&nbsp;{editableInfo.state}</text>}
                {canEdit ? <text><br></br>&nbsp;&nbsp;&nbsp;&nbsp;<input onChange={handleZipChange} defaultValue={editableInfo.zip}></input></text> : <text className='eventDetailsAddressInfo'><br></br>&nbsp;&nbsp;&nbsp;&nbsp;{editableInfo.zip}</text>}
                

                <br></br><br></br>
                <text className='eventDetailsAddress'><b>MAX RIDE RADIUS:</b> </text> {canEdit ? <text> <input onChange={handleRadiusChange} type="number" defaultValue={editableInfo.radius}></input> miles</text> : <text className='eventDetailsAddressInfo'> {editableInfo.radius} miles</text>}
                <br></br>
                <text className='eventDetailsAddress'><b>RIDER PASSWORD:</b> </text> {canEdit ? <text><input onChange={handleRiderPasswordChange} defaultValue={editableInfo.riderPassword}></input></text> : <text className='eventDetailsAddressInfo'>{editableInfo.riderPassword}</text>}
                <br></br>
                <text className='eventDetailsAddress'><b>DRIVER PASSWORD:</b> </text> {canEdit ? <text><input onChange={handleDriverPasswordChange} defaultValue={editableInfo.driverPassword}></input></text> : <text className='eventDetailsAddressInfo'>{editableInfo.driverPassword}</text>}
                <br></br>
                <text className='eventDetailsStat'><b>TOTAL NUMBER OF RIDES COMPLETED:</b> {numRidesCompleted}</text>
                <br></br>
                <text className='eventDetailsStat'><b>TOTAL NUMBER OF DRIVERS:</b> {numDrivers}</text>
                <br></br>

            </div>
            <div className='event-details-page-map-and-refresh'>
            <div className='eventDetailsContentMap'>
                {mapLoaded ? Map(driverList) : null}
            </div>
            <button className='event-details-page-refresh-button' onClick={handleRefresh}>REFRESH</button>
            </div>
        </div>
        <div>
            {canEdit ? <GenericSubmitButton onClickFunction={handleSubmitted}/> : <button className='eventDetailsEditButton' onClick={handleEditPressed}>EDIT</button>}
        </div>
        </div>
    {ridesList ? <div className='ridesList'>{ridesList.map((element) => {return Ride(element.rider_name, element.needs_ride, element.in_ride, element.eta, element.group_size)})}</div> : null}

    </div> : null}
    </div>
);
}
export default EventDetailsPage;