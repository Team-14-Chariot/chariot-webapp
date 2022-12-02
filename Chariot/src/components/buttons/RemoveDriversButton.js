import './RemoveDriverButton.css';

const RemoveDriverButton = ({onClickFunction}) => {
return(
 <div className="button-container">
  <button className={`remove-driver-button`} onClick={onClickFunction}>REMOVE DRIVER</button>
 </div>
)
}
export default RemoveDriverButton;