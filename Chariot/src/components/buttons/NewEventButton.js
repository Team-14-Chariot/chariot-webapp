import './NewEventButton.css';
import { useNavigate } from 'react-router-dom';


function NewEventButton () {
    const navigate = useNavigate();

    const createNewEvent = () => {
        navigate('../create-event-page/');
    }

return(
 <div className="button-container">
  <button className={`newevent-button`} onClick={createNewEvent}>+ Create New Event</button>
 </div>
)
}
export default NewEventButton;