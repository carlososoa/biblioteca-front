import NavBar from "./NavBar"
import { useState } from 'react';
import  './AdminLibros.css'
import NuevoLibro from "./NuevoLibro";
import EditLibro from './EditLibro'


const AdminLibros = () => { 


  const [pestania, setPestania] = useState('defecto')

  function cambiarPestania(valorPestania){
    setPestania(valorPestania)
  }

/*     useEffect(()=>{
    fetchLibros()
  },[]) */
  let contenido = <NuevoLibro/>

  switch (pestania) {
    case 'a':
      contenido = <NuevoLibro/>
      break;
    
    case 'b':
      contenido = <EditLibro/>
      
      break;
  
    default:
      contenido = <NuevoLibro/>
      break;
  }



  

  return (
    <>
      <NavBar/>
      <h3 id="titulo" >Administrador de libros</h3>
      <section className="" >
        <ul id="pestanias" >
          <li onClick={() => cambiarPestania('a')} >Agregar libro</li>
          <li onClick={() => cambiarPestania('b')} >Editar libro</li>
        </ul>

        {contenido}


        
      </section>
    </>
  );
};

export default AdminLibros;
