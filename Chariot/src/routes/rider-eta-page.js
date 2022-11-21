import { useState } from 'react';
import HeaderBlank from '../components/views/HeaderBlank';
import './rider-eta-page.css';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";



function RiderEtaPage() {

    const [hasDriver, setHasDriver] = useState(false);

    const [ETA, setETA] = useState("calculating...");

    setInterval(async function () {
        var time = 5; //get ETA from backend
        if (time !== null) {
            setETA(time + " seconds");
        } else {
            setETA("calculating...")
        }
    }, 3 * 1000);

    const params = useParams();
    const eventCode = params.eventCode;
    const rideId = params.rideId;
    const navigate = useNavigate();

    const editPickup = () => {
        navigate(`../edit-pickup/${eventCode}/${rideId}`);
    }

    const editDropoff = () => {
        navigate(`../edit-dropoff/${eventCode}/${rideId}`);
    }

    const driver_loc = { lat: 40.423730, lng: -86.910890 };
    const ZOOM_LEVEL = 17;


    return (
        <div>
            <HeaderBlank></HeaderBlank>

            <div className="rider_eta_page_container">

                <div className="edit_location_container" align="right">

                    <button onClick={editPickup}>Edit Pickup Location</button>

                    <button onClick={editDropoff}>Edit Dropoff Location</button>

                </div>

                <center>

                <h1>Your location has been sent!</h1>
                <h2>Your driver will be here in: {ETA}</h2>

                <br></br>

                    <h3>Your driver's current location: </h3>

                    <MapContainer center={driver_loc} zoom={ZOOM_LEVEL}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            id="driver_marker"
                            position={driver_loc}
                            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 12] })}>
                            <Popup minWidth={90}>
                                Your driver's current location
                            </Popup>
                        </Marker>
                    </MapContainer>

                    <br></br>

                </center>
            </div>
        </div>
    );
}
export default RiderEtaPage;