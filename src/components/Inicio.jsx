import './Inicio.css'
import BarraInicio from './BarraInicio'
import useAuth from './useAuth'
import ProtectedPage from './ProtectedPage'



function Inicio() {

  const estaAutorizado = useAuth()

  while (estaAutorizado == null) {
    return(
      <div>
        <h1>Cargando...</h1>
      </div>
    )}

  if (!estaAutorizado) {
    return (
      <>
      <BarraInicio/>      
      <section className='contenedor-portada'>
          <div id='cuadro-texto' >
              <p className='titulo-principal' >Bienvenido a nuestro sistema de biblioteca publica IUD</p>
              <p className='subtitulo' >Lee y aprende</p>
          </div>
          <div>
              <img className='img-portada' src="assets/portada.jpeg" alt="portada" />
          </div>
      </section>
      </>
    )   
    
  }
  return <ProtectedPage/>
  
  
}

export default Inicio