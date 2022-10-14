import {useEffect, useState} from 'react';
import './registration-page.css';
import GenericSubmitButton from '../components/buttons/GenericSubmitButton';
import { useNavigate } from 'react-router-dom';
import HeaderBlank from '../components/views/HeaderBlank';
import {thisUser} from '../index';

function RiderLinkPage() {
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        riderLink: "",
    })

    const [submitted, setSubmitted] = useState(false);
    const [correctLinkFormat, setCorrectLinkFormat] = useState(true);

    const handleRiderLink = (event) => {
        setInfo({...info, riderLink: event.target.value})
    }

    const handleSubmitted = (event) => {
        event.preventDefault();
        if(info.riderLink > 8 && info.link.includes('.')){
            setSubmitted(true);
        }
        else {
            setSubmitted(false);
        }
    }

    useEffect(() => {
        console.log(submitted + " " + correctLinkFormat);
        if(submitted && correctLinkFormat){
            console.log("submitted");
            thisUser.setSignedIn(true);
            thisUser.setUserLink(info.link);
            sendJSON();
            navigate('../numRiders/');
        }
    }, [correctLinkFormat, submitted, navigate, info.link]);
    
    return (
        <body>
        <HeaderBlank />
        <div className="container">
        <h1>Rider-link</h1>
        <form>
            <label>Link</label><br></br>
            <input onChange={handleRiderLink} type="text" name="link" value={info.riderLink}></input><br></br>
            <GenericSubmitButton onClickFunction={handleSubmitted} />
            {submitted ? <div>Rider Link Approved!</div> : null}
        </form>
        </div>
        </body>
        );

        function sendJSON(){
            let result = document.querySelector('.result');

            let link = document.querySelector('#link');
              
            // Creating a XHR object
            let xhr = new XMLHttpRequest();
            let url = "chariot.augustabt.com";
       
            // open a connection
            xhr.open("POST", url, true);
 
            // Set the request header i.e. which type of content you are sending
            xhr.setRequestHeader("rider-link", "application/json");
 
            // Create a state change callback
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
 
                    // Print received data from server
                    result.innerHTML = this.responseText;
 
                }
            };
 
            // Converting JSON data to string
            var data = JSON.stringify({ "link": info.riderLink});
 
            // Sending data with the request
            xhr.send(data);
        }
}
export default RiderLinkPage;