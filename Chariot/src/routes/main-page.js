import './main-page.css';
import {useEffect, useState} from 'react';
import Header from '../components/views/Header';
import NewEventButton from '../components/buttons/NewEventButton';
import Event from '../components/views/Event';
import {listEvents} from '../integration/eventIntegration';
import {thisUser} from '../index';
import {useNavigate} from 'react-router-dom';



function MainPage() {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);  

  useEffect(() => {
    listEvents(thisUser.getUserEmail()).then(d => {setEventList(d.events)});
  }, [])

  const handleDrivers = (eventCode) => {
    navigate(`../event-drivers/${eventCode}`);
  }

  const handleClicked = (eventCode) => {
    navigate(`../event-details/${eventCode}`);
}

return (
  <body>
      <Header/>
    <div className='main_page_container'>
        <NewEventButton />
        {eventList ? <div className='eventsList'>{eventList.map((element) => {return Event(element.event_name, element.address, element.ride_max_radius, element.event_id, element.accept_rides, handleClicked, handleDrivers)})}</div> : null}
    </div>
  </body>
);
}
export default MainPage;