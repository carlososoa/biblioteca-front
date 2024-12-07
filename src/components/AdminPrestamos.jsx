import NavBar from "./NavBar"
import { useState } from 'react'
import  './AdminLibros.css'
import PrestamosActivos from "./PrestamosActivos";
import HistorialPrestamos from "./HistorialPrestamos";



const AdminPrestamos = () => { 


  const [pestania, setPestania] = useState('defecto')

  function cambiarPestania(valorPestania){
    setPestania(valorPestania)
  }

/*     useEffect(()=>{
    fetchLibros()
  },[]) */
  let contenido = <PrestamosActivos/>

  switch (pestania) {
    case 'a':
      contenido = <PrestamosActivos/>
      break;
    
    case 'b':
      contenido = <HistorialPrestamos/>
      
      break;
  
    default:
      contenido = <PrestamosActivos/>
      break;
  }



  

  return (
    <>
      <NavBar/>
      <h3 id="titulo" >Administrador de prestamos</h3>
      <section className="" >
        <ul id="pestanias" >
          <li onClick={() => cambiarPestania('a')} >Devoluciones</li>
          <li onClick={() => cambiarPestania('b')} >Historial de prestamos</li>
        </ul>

        {contenido}


        
      </section>
    </>
  );
};

export default AdminPrestamos;
