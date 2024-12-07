import { useEffect, useState } from 'react';
import  './ProtectedPage.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"


const PrestamosActivos = () => { 
  const url_api = import.meta.env.VITE_API_URI;
  const [prestamos, setPrestamos] = useState([])
  const navigate = useNavigate()
  const [prestamoId, setPrestamoId] = useState()
  const [prestamo, setPrestamo] = useState()
  const { register, handleSubmit, setValue } = useForm()


  const fetchPrestamosActivos = async () => {

    try {
        
      const response = await fetch(`${url_api}/prestamo/activos`)
      const data = await response.json()      
      setPrestamos(data)       

    } catch (error) {
      console.log(error);
    }
  }

  const fetchPrestamo = async (prestamo_id) => {

    try {
        
      const response = await fetch(`${url_api}/prestamo/id/${prestamo_id}`)
      const data = await response.json()      
      setPrestamo(data)
      setValue('prestamo_id', data.prestamo_id)
      let fecha_inicio = new Date(data.fecha_inicio)
      let fecha_limite = new Date(data.fecha_limite)
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', };
      fecha_inicio = fecha_inicio.toLocaleDateString('en-CA', options);
      fecha_limite = fecha_limite.toLocaleDateString('en-CA', options);
      const hoy = new Date()
      setValue('fecha_fin', hoy)
      console.log(hoy)

      // Calcular la diferencia en milisegundos 
      const diferenciaMs = hoy - data.fecha_limite; // Convertir la diferencia de milisegundos a días 
      const msEnUnDia = 24 * 60 * 60 * 1000; // Milisegundos en un día 
      let diferenciaDias = Math.floor(diferenciaMs / msEnUnDia);

      setValue('fecha_inicio', fecha_inicio)
      setValue('fecha_limite', fecha_limite)
      
      if(diferenciaDias<0){
        setValue('diasMulta', 0) 
        diferenciaDias = 0

      }else{
        setValue('diasMulta', diferenciaDias)
      }
      const totalMulta = diferenciaDias * 4300
      setValue('multa', totalMulta)
      setValue('saldo', totalMulta)
      setValue('estado', "Terminado")
      setValue('libro_id',data.libro_id)
      console.log(data.libro_id)

           

    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = handleSubmit((data) => {    

      const enviarDatos = async () => {
        const respuesta = await fetch(`${url_api}/prestamo/devolucion/${data.prestamo_id}`, {
          method: "PUT",
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        if (respuesta.status == 200) {
          alert('Prestamo actualizado Correctamente')
          fetchPrestamosActivos()
  
  
        } else if (respuesta.status == 500) {
          const respuestaTexto = await respuesta.text()
            alert(respuestaTexto)
  
        } else {
          const respuestaJson = await respuesta.json()
          alert(respuestaJson.mensaje[0].msg)
        }
      }
  
      try {
        enviarDatos()
  
      } catch (error) {
        console.log(error);
      }
    


  })

  useEffect(()=>{
    fetchPrestamosActivos()
  },[])



  return (
    <>
    <div className='contenedor-devoluciones' >
    <section className="lista-libros" >
        <h4>Prestamos Activos</h4>
      <table>
              <thead>
                <th>id</th>
                <th>Titulo</th>
                <th>Usuario</th>
                <th>Estado</th>
                <th>Acción</th>
              </thead>
              <tbody>
                {prestamos.map(prestamo => <tr key = {prestamo.prestamo_id}>
                  <td>{prestamo.prestamo_id}</td>
                  <td>{prestamo.titulo_libro}</td>
                  <td>{prestamo.nombre_usuario}</td>
                  <td>{prestamo.estado }</td>
                  <td>
                    <button onClick={()=>fetchPrestamo(prestamo.prestamo_id)} >Devolver</button>         
                  </td>
                  </tr>)}
              </tbody>
            </table>     
      </section>


        <section>
            <h4>Recibir Libro</h4>
            <form id='form-devolucion-libro'  onSubmit={onSubmit}>
            <div className='contenedor-form-nuevo'>
                <label htmlFor="">Id del prestamo</label>
                <input type="text" disabled {...register("prestamo_id", { required: true })} id="prestamo_id" />
                <label htmlFor="">Fecha de inicio</label>
                <input type="date" disabled {...register("fecha_inicio", { required: true })} id="fecha_inicio" />
                <label htmlFor="">Fecha Limite</label>
                <input type="date" disabled {...register("fecha_limite", { required: true })} id="fecha_limite" />
                <label htmlFor="diasMulta">Dias de multa</label>
                <input type="text" disabled {...register("diasMulta", { required: true })} id="diasMulta" />
                <label htmlFor="multa">Total Multa</label>
                <input type="text" disabled {...register("multa", { required: true })} id="multa" />
                <label htmlFor="observacion">Observación</label>
                <input type="text"  {...register("observacion", { required: true })} id="observacion" />
            </div>

            <button className="boton-rojo" type="submit">Guardar</button>
            
            </form>

        </section>
    
    </div>      
      
    </>
  );
};

export default PrestamosActivos;