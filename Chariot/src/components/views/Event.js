import './Event.css';
import EndButton from '../buttons/EndButton';
import {endEvent} from '../../integration/eventIntegration';

function Event(userEmail, eventName, eventAddr, eventRadius, eventCode){


    const handleEnded = async (event) => {
        event.preventDefault();
        const res = await endEvent(eventCode);
        if(res.status === "success"){
            console.log("success");
        } else {
            console.log("failed");
        }
    }

    return(
    <div>
        <div className="eventContainer">
            EVENT NAME: {eventName}         EVENT CODE: {eventCode} <br></br>
            EVENT ADDRESS: {eventAddr}<br></br>
            MAX RADIUS: {eventRadius} miles
            <EndButton onClickFunction={handleEnded}/>
        </div>
        <br></br>
    </div>
    )
}
export default Event;