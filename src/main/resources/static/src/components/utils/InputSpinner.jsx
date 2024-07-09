import '../../styles/utils/InputSpinner.css';
const InputSpinner = ({initialValue= 0,addElement, removeElement}) => {
  return (
    <div className={'input-spinner'}>
      <div className={'input-spinner-container'}>
        <button onClick={() => removeElement()}>-</button>
        <div><p>{initialValue}</p></div>
        <button onClick={() => addElement()}>+</button>
      </div>
    </div>
  )
}
export default InputSpinner;