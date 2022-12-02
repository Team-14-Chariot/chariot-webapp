import './Map.css';
import { MapContainer, TileLayer, Marker} from "react-leaflet";
import { Icon } from 'leaflet'
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"


function Map(driverList){
    
    const start_center = { lat: 40.423730, lng: -86.910890 }
    const ZOOM_LEVEL = 14;

    return(
    <div className='Map_map_container'>
        <MapContainer center={start_center} zoom={ZOOM_LEVEL} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> 
            {driverList.map((driver) => { console.log(driver.current_latitude + " " + driver.current_longitude); return <Marker position={{lat: driver.current_latitude, lng: driver.current_longitude}} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 12] })}></Marker>})}
        </MapContainer>
    </div>
    )
}
export default Map;