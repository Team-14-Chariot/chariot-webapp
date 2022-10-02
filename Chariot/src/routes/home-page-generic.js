import './home-page-generic.css';
import SignInButton from '../components/buttons/SignInButton';
function HomePageGeneric() {
return (
<div className="container">
  <h1>CHARIOT</h1>
  <div className="inner-container">
   <SignInButton/>
  </div>
 </div>
);
}
export default HomePageGeneric;