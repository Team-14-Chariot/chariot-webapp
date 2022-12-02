import './Driver.css';
import EndButton from '../buttons/EndButton';
//import { removeDriver } from '../../integration/eventIntegration';
//import { useNavigate } from 'react-router-dom';


function Driver(driverID, driverName, carCap, carDescription, eventCode, active){
    //const navigate = useNavigate();
    

    const handleRemove = (driver) => {
        //remove driver
        driver.preventDefault();
        //navigate('../main-page/');
        //await removeDriver(driverName);
    }

    /*
    <div className='driver_end_button'>
                {!active ? <EndButton onClickFunction={() => handleEnded}/> : null}
            </div>
    */


    return(
    <div className={active ? 'driverContainer' : 'noDriverContainer'}>
        <div className='driver_header_container'>
            <div className='driver_name'>
                {driverName}
            </div>
            <div className='driver_end_button'>
                {!active ? <EndButton onClickFunction={handleRemove}/> : null}
            </div>
            <div className='event_code'>
                {eventCode}
            </div>
        </div>
        <div className='driver_body_container'>
            <div className='car_description'>
                CAR DESCRIPTION:
            </div>
            <div className='car_description_info'>
                {carDescription}
            </div>
            <div className='car_capacity'>
                CAR CAPACITY:
            </div>
            <div className='car_capacity_info'>
                {carCap}
            </div>
        </div>
    </div>
    )
}
export default Driver;