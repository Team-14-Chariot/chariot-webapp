import './EndButton.css';

const EndButton = ({onClickFunction}) => {
return(
 <div className="button-container">
  <button className={`end-button`} onClick={onClickFunction}>END</button>
 </div>
)
}
export default EndButton;