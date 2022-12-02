import './ViewDriversButton.css';

const ViewDriversButton = ({onClickFunction}) => {
return(
 <div className="button-container">
  <button className={`view-drivers-button`} onClick={onClickFunction}>View Drivers</button>
 </div>
)
}
export default ViewDriversButton;