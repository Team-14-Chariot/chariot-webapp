import './Event.css';

const Event = (eventName, eventAddr, eventCity, eventState, eventZip, eventRadius, eventCode) => {
    const fullAddress = "" + eventAddr + ", " + eventCity + ", " + eventState + " " + eventZip;
    return(
    <div className="eventContainer">
        EVENT NAME: {eventName}         EVENT CODE: {eventCode} <br></br>
        EVENT ADDRESS: {fullAddress}<br></br>
        MAX RADIUS: {eventRadius} miles
    </div>
    )
}
export default Event;