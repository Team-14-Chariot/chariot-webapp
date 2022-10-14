import React from "react";
import { useState, useRef, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "./request-ride-page.css";
import "leaflet/dist/leaflet.css";
import "leaflet";


function RequestRide() {
    const navigate = useNavigate();

    const center =  {lat: 40.423730, lng: -86.910890 }
    const [draggable, setDraggable] = useState(false);
    const [startPosition, setStartPosition] = useState(center);
    const [endPosition, setEndPosition] = useState(center);
    const ZOOM_LEVEL = 17;

    var start_loc = null;
    var end_loc = null;

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
        <html>
            <h1> SELECT START LOCATION </h1>
            <p>Click on the location where you would like to be picked up from.</p>
            <div id="start_map"></div>
            <br></br>
            <MapContainer center={center} zoom={ZOOM_LEVEL}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    id="start_marker"
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    position={startPosition}
                    ref={startRef}>
                    <Popup minWidth={90}>
                        <span onClick={toggleDraggable}>
                            {draggable
                                ? 'Marker is draggable'
                                : 'Click here to make marker draggable'}
                        </span>
                    </Popup>
                </Marker>
            </MapContainer>

            <br></br>

            <h1> SELECT END LOCATION </h1>
            <p>Click on the location where you would like to be dropped off at.</p>
            <MapContainer center={center} zoom={ZOOM_LEVEL}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    id="end_marker"
                    draggable={draggable}
                    eventHandlers={eventHandlers2}
                    position={endPosition}
                    ref={endRef}>
                    <Popup minWidth={90}>
                        <span onClick={toggleDraggable}>
                            {draggable
                                ? 'Marker is draggable'
                                : 'Click here to make marker draggable'}
                        </span>
                    </Popup>
                </Marker>
            </MapContainer>

            <br></br>

            <h3>Please enter your name and the number of people (including yourself) in your party. Press "Request Ride" once all fields have been entered.</h3>
            <form>
                <input id="requester-name" type="text" placeholder="e.g. John Doe"></input>
                <br></br>
                <input id="group-size" type="text" placeholder="eg. 3"></input>
                <br></br>
                <input id="submit-button" type="submit" value="Request Ride"></input>
            </form>

        </html>
    );
}
export default RequestRide;