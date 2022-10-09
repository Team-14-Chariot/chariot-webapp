import './HeaderBlank.css';
import chariotLogo from '../images/chariot-logo.png';

const HeaderBlank = () => {
return(
 <div className="headerContainer">
    <img className='chariotLogoContainer' src={chariotLogo} alt='Chariot Logo'></img>
    <div className='appTitle'>C H A R I O T</div>
    <div className='signInButtonContainer'></div>
 </div>
)
}
export default HeaderBlank;