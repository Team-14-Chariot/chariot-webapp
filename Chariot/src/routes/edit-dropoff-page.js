import HeaderBlank from '../components/views/HeaderBlank';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import { Icon } from 'leaflet'
import "leaflet/dist/leaflet.css";
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { updateDropoff } from '../integration/eventIntegration';
import './edit-location-page.css';


function EditDropoffPage() {

    const params = useParams();
    const eventCode = params.eventCode;
    const rideId = params.rideId;

    const [submitted, setSubmitted] = useState(false);

    const start_center = { lat: 40.423730, lng: -86.910890 };
    const [draggable, setDraggable] = useState(false);
    const [startPosition, setStartPosition] = useState(start_center);
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

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, []);

    const sendUpdatedRide = async () => {
        if(!submitted) {
            console.log("clicked submit");
            setSubmitted(true);
            await updateDropoff(rideId, startPosition.lat, startPosition.lng);
        }
    }

    const navigate = useNavigate();
    const cancel = () => {
        navigate(`../rider-eta-page/${eventCode}/${rideId}`);
    }

    return (
        <div>
            <HeaderBlank></HeaderBlank>

            <br></br>

            <button onClick={cancel}>Back</button>

            <center>
                <h1>EDIT DROPOFF LOCATION</h1>
                <p>The marker below is your <strong>DROPOFF LOCATION</strong>. Click on it and follow the directions to update your dropoff location.</p>

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
                                    ? 'Drag the marker to the dropoff location'
                                    : 'Click here to make the dropoff marker draggable'}
                            </span>
                        </Popup>
                    </Marker>

                </MapContainer>
                </div>

                <br></br>

                <GenericSubmitButton onClickFunction={sendUpdatedRide}></GenericSubmitButton>
                {submitted ?
                    <div>
                        <div className='confirmation-signal'>
                            Submitted!
                        </div>
                        <div>Press the button in the top lefthand corner to return back to the ETA page</div>
                    </div> : null}

                <br></br>

            </center>
        </div>
    )
}
export default EditDropoffPage;