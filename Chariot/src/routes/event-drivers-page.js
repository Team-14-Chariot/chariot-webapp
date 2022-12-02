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
    //listDrivers(eventCode).then(d => {setDriverList(d.drivers)});
    setDriverList([{id:"f23432", name:"Heyo", car_capacity: 4, car_description:"sedan", event_id:"KJGSAF", active: true},{id:"f2231232", name:"Burt", car_capacity: 6, car_description:"Wagon", event_id:"KJSDF", active: false}])
  }, [eventCode])

  //const [rerender, setRerender] = useState(0);
    useEffect(() => {
        thisUser.setSignedIn(window.localStorage.getItem('thisUserSignedIn'));
        thisUser.setUserEmail(window.localStorage.getItem('thisUserEmail'));
        thisUser.setUserToken(window.localStorage.getItem('thisUserToken'));
        thisUser.setUserId(window.localStorage.getItem('thisUserId'));
        //setRerender(rerender + 1);
    }, [/*rerender*/]);

return (
  <body>
      <Header/>
    <div className='drivers_page_container'>
      <div className='eventDriversCode'>
      DRIVERS FOR {eventCode}
      </div>
      {driverList ? <div className='driverList'>{driverList.map((element) => {return Driver(element.id, element.name, element.car_capacity, element.car_description, element.event_id, element.active)})}</div> : null}
    </div>
  </body>
);
}
export default EventDriversPage;