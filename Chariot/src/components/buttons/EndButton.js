import './EndButton.css';

const EndButton = ({onClickFunction}) => {
return(
 <div className="button-container">
  <button className={`custom-button`} onClick={onClickFunction}>END</button>
 </div>
)
}
export default EndButton;