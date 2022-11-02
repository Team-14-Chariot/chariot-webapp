import './Event.css';
import EndButton from '../buttons/EndButton';
import {endEvent} from '../../integration/eventIntegration';


function Event(eventName, eventAddr, eventRadius, eventCode, eventAcceptingRides, handleClicked){
    

    const handleEnded = async (event) => {
        event.preventDefault();
        await endEvent(eventCode);
    }


    return(
    <div className="eventContainer" onClick={() => handleClicked(eventCode)}>
        <div>
            EVENT NAME: {eventName}         EVENT CODE: {eventCode} <br></br>
            EVENT ADDRESS: {eventAddr}<br></br>
            MAX RADIUS: {eventRadius} miles
            {eventAcceptingRides ? <EndButton onClickFunction={handleEnded}/> : null}
        </div>
        <br></br>
    </div>
    )
}
export default Event;