import './main-page.css';
import Header from '../components/views/Header';
import NewEventButton from '../components/buttons/NewEventButton';
import Event from '../components/views/Event';


function MainPage() {
  const DemoEvent = () => {return Event("demo-value", "123 Demo Street", "Demo", "DM", 12345, 2, "DEMO1")};
return (
  <body>
      <Header/>
    <div className='container'>
        <NewEventButton />
        <br></br>
        <br></br>
        <DemoEvent />
    </div>
  </body>
);
}
export default MainPage;