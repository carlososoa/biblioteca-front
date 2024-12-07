import { useEffect, useState } from 'react';
import  './ProtectedPage.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const HistorialPrestamos = () => { 
  const url_api = import.meta.env.VITE_API_URI;
  const [prestamos, setPrestamos] = useState([])
  const navigate = useNavigate()

  

  const fetchPrestamos = async () => {

    try {

      const response = await fetch(`${url_api}/prestamo`)
      const data = await response.json()   
      
      setPrestamos(data)    

    } catch (error) {
      console.log(error);
    }
  }

  function formatearFecha(fecha){
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', };
    var newFecha = new Date(fecha)
    newFecha = newFecha.toLocaleDateString('en-CA', options);
    return newFecha
  }

  useEffect(()=>{
    fetchPrestamos()
  },[])



  return (
    <>

      <h3 id="titulo" >Historico de Prestamos</h3>
      
      <section className="lista-prestamos" >
      <table>
              <thead>
                <th>id</th>
                <th>Fecha Inicio</th>
                <th>Usuario</th>
                <th>Titulo</th>
                <th>Fecha Limite</th>
                <th>Fecha Fin</th>
                <th>Multa</th>
                <th>Estado</th>
                <th>Observacion</th>
              </thead>
              <tbody>
                {prestamos.map(prestamo => <tr key = {prestamo.prestamo_id}>
                  <td>{prestamo.prestamo_id}</td>
                  <td>{ formatearFecha(prestamo.fecha_inicio) }</td>
                  <td>{prestamo.username}</td>
                  <td>{prestamo.titulo}</td>
                  <td>{ formatearFecha(prestamo.fecha_limite) }</td>
                  <td>{ formatearFecha(prestamo.fecha_fin) }</td>
                  <td>{prestamo.multa}</td>
                  <td>{prestamo.estado}</td>
                  <td>{prestamo.observacion}</td>

                  </tr>)}

              </tbody>
            </table>     
      </section>
    </>
  );
};

export default HistorialPrestamos;