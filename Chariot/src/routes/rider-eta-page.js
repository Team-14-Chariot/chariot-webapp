import { useEffect, useState } from 'react';
import HeaderBlank from '../components/views/HeaderBlank';
import './rider-eta-page.css';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from 'leaflet';
import { retrieveDriverInfo, cancelRiderRequest } from '../integration/eventIntegration';
import "leaflet/dist/leaflet.css";
import { getEta } from '../integration/eventIntegration';



function RiderEtaPage() {
    const [driverInfo, setDriverInfo] = useState({
        driverName: "",
        licensePlate: "",
        carDescription: "",
        currentLatitude: "",
        currentLongitude: ""
    });

    const [cancelRequest, setCancelRequest] = useState(false);

    const [mapLoaded, setMapLoaded] = useState(false);

    const [ETA, setETA] = useState("calculating...");

    

    const params = useParams();
    const eventCode = params.eventCode;
    const rideId = params.rideId;
    const navigate = useNavigate();

    async function calculate() {
    const time = await getEta(rideId);
    if (time !== null) {
        setETA(parseInt((time.eta)/60) + " minutes");
    } else {
        setETA("calculating...")
    }
    }
    calculate();

    useEffect(() => {
        async function check() {
            const res = await retrieveDriverInfo(rideId);
            
            if(res.status === "success") {
                setDriverInfo({ driverName: res.info.name, licensePlate: res.info.car_license_plate, carDescription: res.info.car_description, currentLatitude: res.info.latitude, currentLongitude: res.info.longitude });
                setMapLoaded(true);
            }
            
        }
        check();
    }, [eventCode])

    const editPickup = () => {
        navigate(`../edit-pickup/${eventCode}/${rideId}`);
    }

    const editDropoff = () => {
        navigate(`../edit-dropoff/${eventCode}/${rideId}`);
    }

    const cancelRide = async () =>{
        const res = await cancelRiderRequest(rideId);
        console.log(res);

        if(res.status === "success") {
            navigate(`../ride-request/${eventCode}`);
        }
        else {
            setCancelRequest(true);
        }
    }

    const ZOOM_LEVEL = 17;


    return (
        <div>
            <HeaderBlank></HeaderBlank>

            <div className="rider_eta_page_container">

                <div className="edit_location_container" align="right">

                    <button onClick={editPickup}>Edit Pickup Location</button>

                    <button onClick={editDropoff}>Edit Dropoff Location</button>

                    <button onClick={cancelRide}>Cancel Ride</button>
                    {cancelRequest ? 
                    <div>You cannot cancel the ride while riding!</div> : null}

                </div>

                <center>

                    <h1>Your location has been sent!</h1>
                    <h2>Your driver will be here in: {ETA}</h2>

                    <br></br>

                    <h3>Driver's Information:</h3>
                    
                    <p><strong>Name:</strong> {driverInfo.driverName}&emsp;&emsp;<strong>License Plate:</strong> {driverInfo.licensePlate}&emsp;&emsp;<strong>Car Description:</strong> {driverInfo.carDescription}</p>


                    {mapLoaded ?
                    <MapContainer center={[parseFloat(driverInfo.currentLatitude), parseFloat(driverInfo.currentLongitude)]} zoom={ZOOM_LEVEL}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            id="driver_marker"
                            position={[parseFloat(driverInfo.currentLatitude), parseFloat(driverInfo.currentLongitude)]}
                            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 12] })}>
                            <Popup minWidth={90}>
                                Your driver's current location
                            </Popup>
                        </Marker>
                    </MapContainer> : null}

                    <br></br>

                </center>
            </div>
        </div>
    );
}
export default RiderEtaPage;