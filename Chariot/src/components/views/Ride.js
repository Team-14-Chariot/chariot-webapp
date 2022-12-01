import './Ride.css';


function Ride(riderName, needRide, inRide, eta, groupSize){
    



    return(
    <div className={inRide ? 'rideContainer' : 'noRideContainer'}>
        <div className='ride_body_container'>
            <div className='ride_name'>
                RIDER NAME:
            </div>
            <div className='ride_name_info'>
                {riderName}
            </div>
            <div className='ride_eta'>
                ETA:
            </div>
            <div className='ride_eta_info'>
                {eta}
            </div>
            <div className='ride_size'>
                groupSize:
            </div>
            <div className='ride_size_info'> 
            {groupSize}
            </div>
        </div>
    </div>
    )
}
export default Ride;