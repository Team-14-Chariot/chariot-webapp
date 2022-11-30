import './event-drivers-page.css';
import {useEffect, useState} from 'react';
import Header from '../components/views/Header';
import Driver from '../components/views/Driver';
import { listDrivers } from '../integration/eventIntegration';
import {useParams} from 'react-router-dom';



function EventDriversPage() {
  const params = useParams();
  const eventCode = params.eventCode;
  const [driverList, setDriverList] = useState([]);  

  useEffect(() => {
    listDrivers(eventCode).then(d => {setDriverList(d.drivers)});
  }, [eventCode])

return (
  <body>
      <Header/>
    <div className='drivers_page_container'>
      DRIVERS FOR {eventCode}
      {driverList ? <div className='driverList'>{driverList.map((element) => {return Driver(element.id, element.name, element.car_capacity, element.car_description, element.event_id, element.active)})}</div> : null}
    </div>
  </body>
);
}
export default EventDriversPage;