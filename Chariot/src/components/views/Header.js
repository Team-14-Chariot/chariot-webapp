import './Header.css';
import chariotLogo from '../images/chariot-logo.png';
import SignInButton from '../buttons/SignInButton';
import SignedInText from './SignedInText';
import {thisUser} from '../../index';
import UpdateButton from '../buttons/UpdateButton'
import DeleteButton from '../buttons/DeleteAccountButton';

const Header = () => {
   const PersonalSignedInText = () => {return SignedInText(thisUser.getUserEmail())};
   console.log(thisUser.getSignedIn());
return(
 <div className="headerContainer">
    <img className='chariotLogoContainer' src={chariotLogo} alt='Chariot Logo'></img>
    <div className='appTitle'>C H A R I O T</div>
    <div className='updateUserEmail'>{thisUser.getSignedIn() ? <UpdateButton/> : null}</div>
    <div className='deleteAccount'>{thisUser.getSignedIn() ? <DeleteButton /> : null}</div>

    <div className='signInButtonContainer'> {thisUser.getSignedIn() ? <PersonalSignedInText /> : <SignInButton />}</div>
 </div>
)
}
export default Header;