import './home-page-generic.css';
import Header from '../components/views/Header';
import chariotHomeScreen from '../components/images/chariot-home-screen.png';
function HomePageGeneric() {
return (
  <body>
      <Header/>
    <div>
    <img src={chariotHomeScreen} alt='home screen' className='homeScreenImage'></img>
    </div>
  </body>
);
}
export default HomePageGeneric;