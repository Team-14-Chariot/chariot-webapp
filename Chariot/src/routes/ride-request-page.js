import './ride-request-page.css';
import HeaderBlank from '../components/views/HeaderBlank';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { checkEventCode } from '../integration/eventIntegration';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import "leaflet/dist/leaflet.css";
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { requestRide } from '../integration/eventIntegration';

function RideRequestPage() {

    const [info, setInfo] = useState({
        riderName: "",
        groupSize: null,
    })

    const handleRiderNameChange = (event) => {
        setInfo({ ...info, riderName: event.target.value });
    }

    const handleGroupSizeChange = (event) => {
        setInfo({ ...info, groupSize: event.target.value });
    }


    const params = useParams();
    const eventCode = params.eventCode;
    const [verifiedCode, setVerifiedCode] = useState(false);
    useEffect(() => {
        async function check() {
            if (!verifiedCode) {
                const res = await checkEventCode(eventCode);
                console.log(res);
                if (res.status === "success") {
                    setVerifiedCode(true);
                }
            }
        }
        check();
    }, [eventCode, verifiedCode])

    const sendRide = async () => {
        await requestRide(eventCode, startPosition.lat, startPosition.lng, endPosition.lat, endPosition.lng, info.riderName, info.groupSize);
    }

    const start_center = { lat: 40.423730, lng: -86.910890 }
    const end_center = { lat: 40.423730, lng: -86.910890 + 0.0005 }
    const [draggable, setDraggable] = useState(false);
    const [startPosition, setStartPosition] = useState(start_center);
    const [endPosition, setEndPosition] = useState(end_center);
    const ZOOM_LEVEL = 17;


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



    return (
        <div>
            <HeaderBlank></HeaderBlank>
            {verifiedCode ? <h1>RIDE REQUEST FOR {eventCode}</h1> : null}

            <center>
                <h1>SELECT PICKUP AND DROPOFF LOCATIONS</h1>
                <p>The <strong>LEFT MARKER</strong> is your <strong>PICKUP LOCATION</strong>. Click on it and follow the directions to set your start location.</p>
                <p>The <strong>RIGHT MARKER</strong> is your <strong>DROPOFF LOCATION</strong>. Click on it and follow the directions to set your dropoff location.</p>
                <br></br>


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
                                    : 'Click here to make the pickup draggable'}
                            </span>
                        </Popup>
                    </Marker>
                    <Marker
                        id="end_marker"
                        draggable={draggable}
                        eventHandlers={eventHandlers2}
                        position={endPosition}
                        ref={endRef}
                        icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 12] })}>
                        <Popup minWidth={45}>
                            <span onClick={toggleDraggable}>
                                {draggable
                                    ? 'Drag the marker to the dropoff location'
                                    : 'Click here to make the dropoff marker draggable'}
                            </span>
                        </Popup>
                    </Marker>
                </MapContainer>



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

                <GenericSubmitButton onClickFunction={sendRide} />

                <br></br>

            </center>
        </div>
    );
}
export default RideRequestPage;