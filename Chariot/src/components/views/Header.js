import './Header.css';
import chariotLogo from '../images/chariot-logo.png';
import SignInButton from '../buttons/SignInButton';
import { signedIn } from '../..';

const Header = () => {
return(
 <div className="headerContainer">
    <img className='chariotLogoContainer' src={chariotLogo} alt='Chariot Logo'></img>
    <div className='appTitle'>C H A R I O T</div>
    <div className='signInButtonContainer'> {signedIn ? null : <SignInButton />}</div>
 </div>
)
}
export default Header;