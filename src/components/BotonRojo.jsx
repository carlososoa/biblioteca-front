import { Link } from 'react-router-dom';
import './Inicio.css'
function BotonRojo(props){
    // eslint-disable-next-line react/prop-types
    const {ruta, texto} = props

    return(
        <Link to={ruta}><button className='boton-rojo'>{texto}</button>  </Link>
    )
}
export default BotonRojo