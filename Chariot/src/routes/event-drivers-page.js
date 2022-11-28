import './event-drivers-page.css';
import {useEffect, useState} from 'react';
import Header from '../components/views/Header';
import Driver from '../components/views/Driver';
import listDrivers from '../integration/eventIntegration'
import {useNavigate} from 'react-router-dom';



function EventDriversPage() {
  const navigate = useNavigate();
  const eventCode = params.eventCode;
  const [driverList, setDriverList] = useState([]);  

  useEffect(() => {
    listDrivers(eventCode).then(d => {setDriverList(d.drivers)});
  }, [])

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