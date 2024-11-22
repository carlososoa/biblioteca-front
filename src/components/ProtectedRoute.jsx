import useAuth from './useAuth';
import { Link } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {

  const estaAutorizado = useAuth()

  while (estaAutorizado == null) {
    return(
      <div>
        <h1>Cargando...</h1>
      </div>
    )}

  if(!estaAutorizado){
    console.log("no autorizado en ProtectedRoute");
    console.log(estaAutorizado);

    return (
      <div>
        <h2>No estas autorizado inicia sesion para continuar navegando</h2>
        <Link to={'/login'}><button className='boton-rojo'>Iniciar Sesion</button></Link>
      </div>
    )
  }

  return children
};

export default ProtectedRoute;

