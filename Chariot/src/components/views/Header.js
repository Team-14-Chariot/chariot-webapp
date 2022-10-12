import './Header.css';
import chariotLogo from '../images/chariot-logo.png';
import SignInButton from '../buttons/SignInButton';
import SignedInText from './SignedInText';
import {thisUser} from '../../index';

const Header = () => {
   const PersonalSignedInText = () => {return SignedInText(thisUser.getUserEmail())};
return(
 <div className="headerContainer">
    <img className='chariotLogoContainer' src={chariotLogo} alt='Chariot Logo'></img>
    <div className='appTitle'>C H A R I O T</div>
    <div className='signInButtonContainer'> {thisUser.getSignedIn() ? <PersonalSignedInText /> : <SignInButton />}</div>
 </div>
)
}
export default Header;