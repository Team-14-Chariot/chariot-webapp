import './Ride.css';


function Ride(riderName, needRide, inRide, eta, groupSize){
    



    return(
    <div className={inRide ? 'rideContainer' : 'noRideContainer'}>
        <div>
            RIDER NAME: {riderName} <br></br>
            ETA: {eta}<br></br>
            groupSize: {groupSize}
        </div>
        <br></br>
    </div>
    )
}
export default Ride;