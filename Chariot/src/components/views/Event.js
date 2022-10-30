import './Event.css';
import EndButton from '../buttons/EndButton';
import {endEvent} from '../../integration/eventIntegration';
import {useNavigate} from 'react-router-dom';

function Event(eventName, eventAddr, eventRadius, eventCode, eventAcceptingRides){
    //const navigate = useNavigate();

    const handleEnded = async (event) => {
        event.preventDefault();
        await endEvent(eventCode);
    }

    // const handleClicked = () => {
    //     navigate(`../event-details/${eventCode}`);
    // }

    return(
    <div>
        <div className="eventContainer">
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