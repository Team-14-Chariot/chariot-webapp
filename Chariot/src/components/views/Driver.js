import './Driver.css';
import RemoveDriverButton from '../buttons/RemoveDriversButton';
import { removeDriver } from '../../integration/eventIntegration';
//import { useState } from 'react';
//import { removeDriver } from '../../integration/eventIntegration';
//import { useNavigate } from 'react-router-dom';


function Driver(driverID, driverName, carCap, carDescription, active){
    //const navigate = useNavigate();

    //const [deleted, setDeleted] = useState(false);
    //const [isAlertVisable, setIsAlertVisible] = useState(false);

    /*setTimeout(() => {
        setIsAlertVisible(false);
    }, 2000);
    */
    

    const handleRemove = async (driver) => {
        //remove driver
        driver.preventDefault();
        const res = await removeDriver(driverID);
        if(res.status === "success"){
            //setIsAlertVisible(false);
        } else {
            //setIsAlertVisible(true);
        }
        //navigate('../main-page/');
        //await removeDriver(driverName);
    }

    /*
    {isAlertVisable ? 
        <div className='Error Message'>
            CANT DELETE DRIVER
        </div> : null}
    */


    return(
    <div className={active ? 'driverContainer' : 'inactiveDriverContainer'}>
        <div className='driver_header_container'>
            <div className='driver_name'>
                {driverName}
            </div>
            <div className='driver_end_button'>
                <RemoveDriverButton onClickFunction={handleRemove}/> 
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
                {carCap.toString()}
            </div>
        </div>
    </div>
    )
}
export default Driver;