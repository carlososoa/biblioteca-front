import { Link } from 'react-router-dom';
import './Inicio.css'
function BotonAzul(props){

    return(
        <Link to={props.ruta}><button className='boton-azul'>Registrarse</button>  </Link>
    )
}
export default BotonAzul