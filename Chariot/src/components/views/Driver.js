import './Event.css';
import EndButton from '../buttons/EndButton';


function Driver(eventName, eventAddr, eventRadius, eventCode, eventAcceptingRides, handleClicked){
    

    const handleEnded = async (event) => {
        event.preventDefault();
        await endEvent(eventCode);
    }


    return(
    <div className="eventContainer">
        <div className='event_header_container'>
            <div className='event_name'>
                {eventName}
            </div>
            <div className='event_end_button'>
                {eventAcceptingRides ? <EndButton onClickFunction={handleEnded}/> : null}
            </div>
            <div className='event_code'>
                {eventCode}
            </div>
        </div>
        <div className='event_body_container'>
            <div className='event_address'>
                ADDRESS:
            </div>
            <div className='event_address_info'>
                {eventAddr}
            </div>
            <div className='event_click_to_view' onClick={() => handleClicked(eventCode)}>
                &#40; CLICK TO VIEW DETAILS &#41;
            </div>
        </div>
    </div>
    )
}
export default Driver;