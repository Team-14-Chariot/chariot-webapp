import './ride-request-page.css';
import HeaderBlank from '../components/views/HeaderBlank';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { checkEventCode } from '../integration/eventIntegration';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import red_map_marker from '../components/images/red_map_marker.png'
import { Icon } from 'leaflet'
import "leaflet/dist/leaflet.css";
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { requestRide, retrieveEventInfo, sendImage, getETA, getWaitTime } from '../integration/eventIntegration';

function RideRequestPage() {
    const navigate = useNavigate();
    
    const [requestRideETA, setRequestRideETA] = useState(0);

    const [info, setInfo] = useState({
        riderName: "",
        groupSize: null,
    });

    

    //setWaitTime(async function() {
      //  var time = getWaitTime(eventCode); //get ETA from backend
       // if (time !== null){
       //     setETA(time/60 + " minutes");
       // } else {
       //     setETA("calculating...")
       // }
    //}, 5 * 1000);

    const handleRiderNameChange = (event) => {
        setInfo({ ...info, riderName: event.target.value });
    }

    const handleGroupSizeChange = (event) => {
        setInfo({ ...info, groupSize: event.target.value });
    }


    const [image, setImage]= useState();
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    }

    const params = useParams();
    const eventCode = params.eventCode;
    const [waitTime, setWaitTime] = useState(0);
    useEffect(() => {
        async function ballpark(){
            setWaitTime(parseInt(((await getWaitTime(eventCode)).waitTime) / 60) + " minutes");
        }
        ballpark();
    }, [eventCode])
    const [verifiedCode, setVerifiedCode] = useState(false);
    const [passwordProtected, setPasswordProtected] = useState(false);
    const [passwordKey, setPasswordKey] = useState(null);
    const [passwordField, setPasswordField] = useState("");
    useEffect(() => {
        async function check() {
            if (!verifiedCode) {
                const res = await checkEventCode(eventCode);
                console.log(res);
                if (res.status === "success") {
                    setVerifiedCode(true);
                }
                const res2 = await retrieveEventInfo(eventCode);
                console.log(res2.info.ridePassword === "");
                if(res2.info.ridePassword !== "" && res2.info.ridePassword !== undefined){
                    setPasswordKey(res2.info.ridePassword);
                    setPasswordProtected(true);
                }
            }
        }
        check();
    }, [eventCode, verifiedCode])



    let rideId;
    const sendRide = async () => {
        rideId = await requestRide(eventCode, startPosition.lat, startPosition.lng, endPosition.lat, endPosition.lng, info.riderName, info.groupSize);
        console.log(rideId);
        sendImage(rideId, image);
        navigate(`../rider-eta-page/${eventCode}/${rideId}`);
    }



    const start_center = { lat: 40.423730, lng: -86.910890 }
    const end_center = { lat: 40.423730, lng: -86.910890 + 0.0005 }
    const [draggable, setDraggable] = useState(false);
    const [startPosition, setStartPosition] = useState(start_center);
    const [endPosition, setEndPosition] = useState(end_center);
    const ZOOM_LEVEL = 17;

    useEffect(() => {
        async function generateEta(){
            if (startPosition != null && endPosition != null) {
                console.log(startPosition.lat + " " + startPosition.lng);
                const eta = await getETA(eventCode, startPosition.lat, startPosition.lng, endPosition.lat, endPosition.lng);
                setRequestRideETA(parseInt(eta.eta / 60) + " minutes");
            }
        }
        generateEta();
        
    }, [startPosition, endPosition])

    const handlePasswordChange = (event) => {
        setPasswordField(event.target.value);
    }

    const handlePasswordCheck = () => {
        if(passwordField === passwordKey){
            setPasswordProtected(false);
        }
    }


    const startRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = startRef.current;

                if (marker != null) {
                    setStartPosition(marker.getLatLng());

                }
            },
        }),
        [],
    )

    const endRef = useRef(null);
    const eventHandlers2 = useMemo(
        () => ({
            dragend() {
                const marker = endRef.current;

                if (marker != null) {
                    setEndPosition(marker.getLatLng());
                }
            },
        }),
        [],
    )

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, []);


    if (verifiedCode) {
        if (!passwordProtected){
        return (
            <div>
                <HeaderBlank></HeaderBlank>


                <center>
                    <h1>SELECT PICKUP AND DROPOFF LOCATIONS</h1>
                    <p>The <strong>BLUE MARKER</strong> is your <strong>PICKUP LOCATION</strong>. Click on it and follow the directions to set your start location.</p>
                    <p>The <strong>RED MARKER</strong> is your <strong>DROPOFF LOCATION</strong>. Click on it and follow the directions to set your dropoff location.</p>
                    <br></br>
                    <br></br>
                    <text className='RideDetailsAddress'><b>ETA TO BE ASSIGNED A DRIVER:</b> {waitTime}</text>
                    <br></br>

                    <div className='ride-request-page-map-container'>
                    <MapContainer center={start_center} zoom={ZOOM_LEVEL}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            id="start_marker"
                            draggable={draggable}
                            eventHandlers={eventHandlers}
                            position={startPosition}
                            ref={startRef}
                            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 12] })}>
                            <Popup minWidth={90}>
                                <span onClick={toggleDraggable}>
                                    {draggable
                                        ? 'Drag the marker to the pickup location'
                                        : 'Click here to make the pickup marker draggable'}
                                </span>
                            </Popup>
                        </Marker>
                        <Marker
                            id="end_marker"
                            draggable={draggable}
                            eventHandlers={eventHandlers2}
                            position={endPosition}
                            ref={endRef}
                            icon={new Icon({ iconUrl: red_map_marker, iconSize: [25, 41], iconAnchor: [12, 12] })}>
                            <Popup minWidth={45}>
                                <span onClick={toggleDraggable}>
                                    {draggable
                                        ? 'Drag the marker to the dropoff location'
                                        : 'Click here to make the dropoff marker draggable'}
                                </span>
                            </Popup>
                        </Marker>
                    </MapContainer>
                    </div>
                    <br></br> 
                    <text className='rideRequestDetailsAddress'><b>APPROXIMATE PICKUP TIME:</b> {requestRideETA}</text>

                    
                    <br></br>

                    <h3>Please enter your name and the number of people <strong>INCLUDING YOURSELF</strong> in your group. Press "Request Ride" once all fields have been entered.</h3>

                    <div>
                        <label>Name: </label>
                        <input onChange={handleRiderNameChange} type="text" placeholder="e.g. John Doe"></input>
                    </div>

                    <br></br>

                    <div>
                        <label>Group Size: </label>
                        <input onChange={handleGroupSizeChange} type="number" placeholder="e.g. 3"></input>
                    </div>
                    <br></br>


                    <div>
                        <p><strong>OPTIONAL: </strong>You may upload a photo of yourself/group to allow your driver to better recognize you and speed up the pickup process</p>
                        <label>Upload Photo: </label><input type="file" accept="image/*" onChange={handleImageChange}></input>
                    </div>

                    <br></br>

                    <GenericSubmitButton onClickFunction={sendRide} />
                    
                    <br></br>
                    
                </center>
            </div>
        );
        }
        else {
            return (
                <div>
                <HeaderBlank></HeaderBlank>
                <center>
                    <h1>This link is password protected</h1>
                    <h2>Please enter the password below: </h2>
                    <input onChange={handlePasswordChange}></input>
                    <GenericSubmitButton onClickFunction={handlePasswordCheck} />
                </center>
            </div>
            )
        }
    }
    else {
        return (
            <div>
                <HeaderBlank></HeaderBlank>
                <center>
                    <h1>Invalid Event Code!</h1>
                    <h2>Please enter the correct URL</h2>
                </center>
            </div>
        )
    }
}
export default RideRequestPage;