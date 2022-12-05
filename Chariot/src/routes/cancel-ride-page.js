import { useState, useEffect } from 'react';
import './cancel-ride-page.css';
import { useNavigate, useParams } from 'react-router-dom';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import HeaderBlank from '../components/views/HeaderBlank';
import { getRiderInfo, cancelRiderRequest } from '../integration/eventIntegration';


function CancelRidePage() {
    const navigate = useNavigate();

    const params = useParams();
    const eventCode = params.eventCode;
    const rideId = params.rideId;

    const [userRiderName, setUserRiderName] = useState("");
    const [userGroupSize, setUserGroupSize] = useState(null);

    const [riderName, setRiderName] = useState("");
    const [groupSize, setGroupSize] = useState(null);

    const [inputErrorMessage, setInputErrorMessage] = useState(false);
    const [inRideErrorMessage, setInRideErrorMessage] = useState(false);

    const handleRiderNameChange = (event) => {
        setUserRiderName(event.target.value);
    }

    const handleGroupSizeChange = (event) => {
        setUserGroupSize(event.target.value);
    }


    useEffect(() => {
        async function check() {
            const res = await getRiderInfo(rideId);
            console.log(res);
            setRiderName(res.rider_name);
            setGroupSize(res.group_size);
        }
        check();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userRiderName, riderName, userGroupSize, groupSize);
        if (userRiderName === riderName && parseInt(userGroupSize) === groupSize) {
            const res = await cancelRiderRequest(rideId);
            console.log(res);

            if (res.status === "success") {
                navigate(`../ride-request/${eventCode}`);
            }
            else {
                setInRideErrorMessage(true);
                setInputErrorMessage(false);
            }
        }
        else {
            setInputErrorMessage(true);
            setInRideErrorMessage(false);
        }
    }

    return (
        <body>
            <HeaderBlank />
            <div className='cancel_ride_page_container'>
                <h1>Cancel Your Ride</h1>
                <h3>Enter your NAME and GROUP SIZE in the fields below, and press "Submit" to confirm your cancellation.</h3>
                <form className='cancel_ride_page_form'>
                    <label>Name:</label>
                    <input onChange={handleRiderNameChange} type="text"></input>

                    <label>Group Size:</label>
                    <input onChange={handleGroupSizeChange} type="number"></input>

                    <br></br>

                    <GenericSubmitButton onClickFunction={handleSubmit} />
                    {inRideErrorMessage ? 
                    <div className='cancel_ride_error'>Error: Cannot cancel ride while in ride!</div> : null}
                    {inputErrorMessage ?
                    <div className='cancel_ride_error'>Error: Name or Group size for the ride is incorrect!</div> : null}
                </form>
            </div>
        </body>
    );
}
export default CancelRidePage;