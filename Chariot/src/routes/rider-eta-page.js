import './start-update-page.css';
import { thisUser } from '../index';

function StartUpdatePage() {
    const riderEtaText = (time) => {
        return(
         <div className="text">
            Your driver will be here in:<br></br>
            {time} minutes
         </div>
        )
        }

    const PersonalEtaText = () => {return riderEtaText(10) };

    return (
    <body>
    <div className="container">
    <h1>Your location has been sent!</h1>
    <h2><PersonalEtaText /></h2>
    </div>
    </body>
    );
}
export default StartUpdatePage;