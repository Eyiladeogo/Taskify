import './css/index.css'
import './css/App.css'

function Button(props) {
  return (
      <button className={props.className}>{props.text}</button>
  );
}


export default Button