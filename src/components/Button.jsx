import "../styles/button.css";


const Button = ({...props }) => {
  return ( 
  <button {...props} className="button">
    Click Me
  </button>
 );
};

export default Button;