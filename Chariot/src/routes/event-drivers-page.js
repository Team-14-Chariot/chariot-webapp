import './event-drivers-page.css';
import {useEffect, useState} from 'react';
import Header from '../components/views/Header';
import Driver from '../components/views/Driver';
import { listDrivers } from '../integration/eventIntegration';
import {useParams} from 'react-router-dom';
import {thisUser} from '../index';



function EventDriversPage() {
  const params = useParams();
  const eventCode = params.eventCode;
  const [driverList, setDriverList] = useState([]);  

  useEffect(() => {
    listDrivers(eventCode).then(d => {setDriverList(d)});
  }, [eventCode])

  //const [rerender, setRerender] = useState(0);
        thisUser.setSignedIn(window.localStorage.getItem('thisUserSignedIn'));
        thisUser.setUserEmail(window.localStorage.getItem('thisUserEmail'));
        thisUser.setUserToken(window.localStorage.getItem('thisUserToken'));
        thisUser.setUserId(window.localStorage.getItem('thisUserId'));

return (
  <body>
      <Header/>
    <div className='drivers_page_container'>
      <div className='eventDriversCode'>
      DRIVERS FOR {eventCode}
      </div>
      {driverList ? <div className='driverList'>{driverList.map((element) => {return Driver(element.id, element.name, element.car_capacity, element.car_description, element.active)})}</div> : null}
    </div>
  </body>
);
}
export default EventDriversPage;