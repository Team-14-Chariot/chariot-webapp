import './main-page.css';
import {useEffect, useState} from 'react';
import Header from '../components/views/Header';
import NewEventButton from '../components/buttons/NewEventButton';
import Event from '../components/views/Event';
import {listEvents} from '../integration/eventIntegration';
import {thisUser} from '../index';


function MainPage() {
  const [eventList, setEventList] = useState([]);  

  useEffect(() => {
    listEvents(thisUser.getUserEmail()).then(d => {setEventList(d.events)});
  }, [])

return (
  <body>
      <Header/>
    <div className='main_page_container'>
        <NewEventButton />
        <br></br>
        <br></br>
        {eventList ? <div className='eventsList'>{eventList.map((element) => {return Event(element.event_name, element.address, element.ride_max_radius, element.event_id, element.accept_rides)})}</div> : null}
    </div>
  </body>
);
}
export default MainPage;