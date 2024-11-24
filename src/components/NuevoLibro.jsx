import './NuevoLibro.css'
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
function NuevoLibro(){
    const url_api = import.meta.env.VITE_API_URI;
    const { register, handleSubmit } = useForm() 
    const [generos, setGeneros] = useState([])
    const [autores, setAutores] = useState([])
    const [editoriales, setEditoriales] = useState([])

    const navigate = useNavigate();

    const fetchGeneros = async () => {
        try {    
          const response = await fetch(`${url_api}/genero`)
          const data = await response.json()    
          setGeneros(data)
        } catch (error) {
          console.log(error);
        }    
      }
      const fetchAutores = async () => {
        try {    
          const response = await fetch(`${url_api}/autor`)
          const data = await response.json()    
          setAutores(data)
        } catch (error) {
          console.log(error);
        }    
      }
      const fetchEditoriales = async () => {
        try {    
          const response = await fetch(`${url_api}/editorial`)
          const data = await response.json()    
          setEditoriales(data)
        } catch (error) {
          console.log(error);
        }    
      }
    
      useEffect(() => {
     fetchGeneros(), fetchAutores(), fetchEditoriales()
  }, [])

  const onSubmit = handleSubmit((data) => {
    
    if ((data.genero_id.localeCompare("errorGenero") == 0) || (data.autor_id.localeCompare("errorAutor") == 0) || (data.editorial_id.localeCompare("errorEditorial")==0)) {
      alert("Dilegencia todos los campos")      
    }else {
      const enviarDatos = async () => {
        const respuesta = await fetch(`${url_api}/libro`, {
          method: "POST",
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        if (respuesta.status == 201) {
          alert('Libro creado Correctamente')
          navigate("/");
  
  
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
    }


  })

    return(
        <>        
        <form id='form-nuevo-libro' onSubmit={onSubmit}>
        <h4 className='titulo-formulario' >Introduce la información para agregar un nuevo libro</h4>
            <div className='contenedor-form-nuevo'>
                <label htmlFor="titulo">Titulo</label>
                <input type="text" {...register("titulo", { required: true })} id="titulo"/>
                <label htmlFor="anio">Año de publicación</label>
                <input type="text" {...register("anio", { required: true })} id="anio"/>
                <label htmlFor="genero_id">Género</label>                
                <select className='desplegable-nuevo-libro' {...register("genero_id", { required: true })} id="genero_id">
                  <option value = "errorGenero" >--Selecciona un género--</option>
                    {generos.map(genero => <option key={genero.genero_id} value={genero.genero_id}>{genero.nombre}</option>                
                )}
                </select>
                <label htmlFor="autor_id">Autor</label>
                <select className='desplegable-nuevo-libro' {...register("autor_id", { required: true })} id="autor_id">
                <option value = "errorAutor" >--Selecciona un autor--</option>
                {autores.map(autor => <option key={autor.autor_id} value={autor.autor_id}>{autor.nombre}</option>                
                )}
                </select>
                <label htmlFor="editorial_id">Editorial</label>
                <select className='desplegable-nuevo-libro'  {...register("editorial_id", { required: true })} id="editorial_id">
                <option value = "errorEditorial" >--Selecciona una editorial--</option>
                {editoriales.map(editorial => <option key={editorial.editorial_id} value={editorial.editorial_id}>{editorial.nombre}</option>                
                )}
                </select>

            </div>
            <div>
             <button className="boton-rojo" type="submit">Guardar</button>
            </div>


            
        </form>
        </>
    )

}

export default NuevoLibro