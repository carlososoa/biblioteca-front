
import { Link } from 'react-router-dom';
import './Inicio.css'
import BotonRojo from './BotonRojo'
import BotonAzul from './BotonAzul'
function BarraInicio(){

    return (
        <nav className='barra-inicio'>
        <div>
           <Link to={'/'}><img className='logo' src='src/assets/logo-biblioteca.png' alt="logo" /></Link> 
        </div>
        <div className='botones-barra'>            
            <Link to={'/protected'}><button className='boton-azul'>Inicio</button></Link>
            <BotonRojo ruta='/login' texto = "Iniciar sesión"/>
            <BotonAzul ruta= '/registrarse' />            
        </div>    
    </nav>  

    )
}

export default BarraInicio