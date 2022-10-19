import './DeleteAccountButton.css';
import { useNavigate } from 'react-router-dom';

function DeleteButton(){
    const navigate = useNavigate();

    const startDelete = () => {
        navigate('../delete-account-page/');
    }
        
    return(
    <div className="button-container">
    <button className='custom-button' onClick={startDelete}>Delete Account</button>
    </div>
    )
}
export default DeleteButton;