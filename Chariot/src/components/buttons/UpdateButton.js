import './UpdateButton.css';
import { useNavigate } from 'react-router-dom';

function UpdateButton(){
    const navigate = useNavigate();

    const startUpdate = () => {
        navigate('../start-update-page/');
    }
        
    return(
    <div className="button-container">
    <button className='custom-button' onClick={startUpdate}>Update Email</button>
    </div>
    )
}
export default UpdateButton;