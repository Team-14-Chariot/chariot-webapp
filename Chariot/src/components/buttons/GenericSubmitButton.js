import './GenericSubmitButton.css';

const GenericSubmitButton = ({onClickFunction}) => {
return(
 <div data-testid="genericSubmitButton" className="button-container">
  <button className={`custom-button`} onClick={onClickFunction}>SUBMIT</button>
 </div>
)
}
export default GenericSubmitButton;