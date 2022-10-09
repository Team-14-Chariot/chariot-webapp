import './main-page.css';
import Header from '../components/views/Header';
import NewEventButton from '../components/buttons/NewEventButton';


function MainPage() {
return (
  <body>
      <Header/>
    <div className='container'>
        <NewEventButton />
    </div>
  </body>
);
}
export default MainPage;