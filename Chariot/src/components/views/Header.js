import './Header.css';
import chariotLogo from '../images/chariot-logo.png';
import dropDown from '../images/drop-down-menu.png'
import SignInButton from '../buttons/SignInButton';
import SignedInText from './SignedInText';
import {thisUser} from '../../index';
import UpdateButton from '../buttons/UpdateButton'
import DeleteButton from '../buttons/DeleteAccountButton';
import React, {useState} from 'react';

const Header = () => {
   const PersonalSignedInText = () => {return SignedInText(thisUser.getUserEmail())};
   const [open, setOpen] = useState(false);
   console.log(thisUser.getSignedIn());
return(
 <div className="headerContainer">
   {thisUser.getSignedIn() ?
   <div className='menu-container'>
      <img className='dropdownMenuContainer' src={dropDown} alt='chariot dropdown' onClick={()=>{setOpen(!open)}}></img>

      <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
            <UpdateButton/>
            <DeleteButton/>
      </div>

    </div> : null }
    <img className='chariotLogoContainer' src={chariotLogo} alt='Chariot Logo'></img>
    <div className='appTitle'>C H A R I O T</div>

    <div className='signInButtonContainer'> {thisUser.getSignedIn() ? <PersonalSignedInText /> : <SignInButton />}</div>
 </div>
)
}
export default Header;