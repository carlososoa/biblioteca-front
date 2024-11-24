import NavBar from "./NavBar"
import { useEffect, useState } from 'react';
import  './ProtectedPage.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ProtectedPage = () => { 
  const url_api = import.meta.env.VITE_API_URI;
  const [libros, setlibros] = useState([])
  const navigate = useNavigate()

  

  const fetchLibros = async () => {

    try {

      const response = await fetch(`${url_api}/libro`)
      const data = await response.json()   
      
      setlibros(data)    

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchLibros()
  },[])



  return (
    <>
      <NavBar/>
      <h3 id="titulo" >Listado de libros</h3>
      
      <section className="lista-libros" >
      <table>
              <thead>
                <th>id</th>
                <th>Titulo</th>
                <th>Año de publicación</th>
                <th>Autor</th>
                <th>Genero</th>
                <th>Editorial</th>
                <th>Estado</th>
                <th>Acción</th>
              </thead>
              <tbody>
                {libros.map(libro => <tr key = {libro.id}>
                  <td>{libro.libro_id}</td>
                  <td>{libro.titulo}</td>
                  <td>{libro.anio}</td>
                  <td>{libro.autor_nombre }</td>
                  <td>{libro.genero_nombre}</td>
                  <td>{libro.editorial_nombre}</td>
                  <td>{libro.estado}</td>
                  <td>
                    <button disabled = {!(libro.estado.localeCompare("Prestado"))} onClick={()=> navigate(`/nuevo-prestamo/${libro.libro_id}`)} >Prestar</button>                  
                  </td>
                  </tr>)}

              </tbody>
            </table>     
      </section>
    </>
  );
};

export default ProtectedPage;
