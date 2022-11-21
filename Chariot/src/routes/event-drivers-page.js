import './event-drivers-page.css';
import {useEffect, useState} from 'react';
import Header from '../components/views/Header';
import NewEventButton from '../components/buttons/NewEventButton';
import Event from '../components/views/Event';
import {listEvents} from '../integration/eventIntegration';
import {thisUser} from '../index';
import {useNavigate} from 'react-router-dom';



function EventDriversPage() {
  const navigate = useNavigate();
  const [driverList, setDriverList] = useState([]);  

  useEffect(() => {
    //listEvents(thisUser.getUserEmail()).then(d => {setEventList(d.events)});
  }, [])

  const handleClicked = (eventCode) => {
    //navigate(`../event-details/${eventCode}`);
}

return (
  <body>
      <Header/>
    <div className='drivers_page_container'>
        {driverList ? <div className='driverList'>{driverList.map((element) => {return Driver(element.event_name, element.address, element.ride_max_radius, element.event_id, element.accept_rides)})}</div> : null}
    </div>
  </body>
);
}
export default EventDriversPage;