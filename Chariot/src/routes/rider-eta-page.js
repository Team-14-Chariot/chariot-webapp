import { useState } from 'react';
import HeaderBlank from '../components/views/HeaderBlank';
import './rider-eta-page.css';
import { useNavigate, useParams } from 'react-router-dom';



function RiderEtaPage() {


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


    return (
        <div>
            <HeaderBlank></HeaderBlank>
            <center>
                <div className="rider_eta_page_container">
                    <h1>Your location has been sent!</h1>
                    <h2>Your driver will be here in: {ETA}</h2>

                    <br></br>
                    
                    

                    <br></br>
                </div>

            </center>
        </div>
    );
}
export default RiderEtaPage;