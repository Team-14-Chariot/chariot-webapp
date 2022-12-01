import { useState } from 'react';
import './rider-eta-page.css';



function RiderEtaPage() {


    const[ETA, setETA] = useState("calculating...");

    setInterval(async function() {
        var time = 5; //get ETA from backend
        if (time !== null){
            setETA(time + " seconds");
        } else {
            setETA("calculating...")
        }
    }, 3 * 1000);


    return (
    <body>
    <div className="rider_eta_page_container">
    <h1>Your location has been sent!</h1>
    <h2>Your driver will be here in: {ETA}</h2>
    </div>
    </body>
    );
}
export default RiderEtaPage;