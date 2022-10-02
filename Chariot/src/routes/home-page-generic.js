import './home-page-generic.css';
import SignInButton from '../components/buttons/SignInButton';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function HomePageGeneric() {
return (
  <Router>
    <div className="container">
      <h1>CHARIOT</h1>
    <div className="inner-container">
      <SignInButton/>
    </div>
    </div>
  </Router>
);
}
export default HomePageGeneric;