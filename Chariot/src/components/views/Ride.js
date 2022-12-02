import './Ride.css';


function Ride(riderName, needRide, inRide, eta, groupSize){
    



    return(
    <div className={inRide ? 'rideContainer' : 'noRideContainer'}>
        <div className='ride_body_container'>
            <div className='ride_name'>
                {riderName}
            </div>
            <text className='ride_eta'> <b>ETA:</b>  <text className='ride_eta_info'>{eta} minutes </text>
            </text>
            <div>
            <text className='ride_size'> <b>groupSize:</b>  <text className='ride_size_info'> {groupSize} </text>
            </text>
            </div>
        </div>
    </div>
    )
}
export default Ride;