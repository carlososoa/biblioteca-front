
import { Link } from 'react-router-dom';
import './Inicio.css'

import Logout from './Logout';
function NavBar(){

    return (
        <nav className='barra-inicio'>
        <div>
           <Link to={'/'}><img className='logo' src='/assets/logo-biblioteca.png' alt="logo" /></Link> 
        </div>
        <div className='botones-barra'>
            <Link to={'/admin-libros'}> <button className='boton-azul' >Admin Libros</button> </Link>             

            <Logout/>            
        </div>    
    </nav>  

    )
}

export default NavBar