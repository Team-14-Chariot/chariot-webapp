import {useState} from 'react';
import './page1.css';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { useNavigate } from 'react-router-dom';

function numRidersPage() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        numRiders: "",
        intNumRiders = parseInt(numRiders)
        
    })

    const [submitted, setSubmitted] = useState(false);

    const handleNumRiders = (event) => {
        setInfo({...info, intNumRiders: rider.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        if(info.intNumRiders >= 1){
            setSubmitted(true);
            navigate('/');
            sendJSON
        }
    }
    
    return (
        <div className="container">
        <h1>numRiders</h1>
        <form>
            <label>Link</label><br></br>
            <input onChange={handleNumRiders} type="text" name="link" value={info.intNumRiders}></input><br></br>
            <GenericSubmitButton onClickFunction={handleSubmitted} />
            {submitted ? <div>You're all Set! A driver will be headed towards you shortly.</div> : null}
        </form>
        </div>
        );

        function sendJSON(){
              
            let numRiders = document.querySelector('#numRiders');
              
            // Creating a XHR object
            let xhr = new XMLHttpRequest();
            let url = "localhost:backendchooses";
       
            // open a connection
            xhr.open("POST", url, true);
 
            // Set the request header i.e. which type of content you are sending
            xhr.setRequestHeader("numRiders", "application/json");
 
            // Create a state change callback
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
 
                    // Print received data from server
                    result.innerHTML = this.responseText;
 
                }
            };
 
            // Converting JSON data to string
            var data = JSON.stringify({ "numRiders": info.intNumRiders});
 
            // Sending data with the request
            xhr.send(data);
        }
}
export default numRidersPage;