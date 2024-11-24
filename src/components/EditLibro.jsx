import './NuevoLibro.css'
import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
function EditLibro(){
    const url_api = import.meta.env.VITE_API_URI;
    const { register, handleSubmit, setValue } = useForm() 
    const [generos, setGeneros] = useState([])
    const [autores, setAutores] = useState([])
    const [editoriales, setEditoriales] = useState([])
    const [libros, setlibros] = useState([])

    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();

    const fetchLibros = async () => {

      try {
  
        const response = await fetch(`${url_api}/libro`)
        const data = await response.json()   
        
        setlibros(data)    
  
      } catch (error) {
        console.log(error);
      }
    }

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

      const fetchLibro = async (id) => {

        try {
    
          const response = await fetch(`${url_api}/libro/${id}`)
          const data = await response.json()
          console.log(data);      
          setValue('libro_id', data.libro_id)
          setValue('titulo', data.titulo)
          setValue('autor_id', data.autor_id)
          setValue('anio', data.anio)
          setValue('editorial_id', data.editorial_id)
          setValue('genero_id', data.genero_id)
          setValue('estado', data.estado)    
        } catch (error) {
          console.log(error);
        }
    
      }
    
      useEffect(() => {
     fetchGeneros(), fetchAutores(), fetchEditoriales(), fetchLibros()
  }, [])

  const onSubmit = handleSubmit((data) => {
    
    if ((toString(data.genero_id).localeCompare("errorGenero") == 0) || (toString(data.autor_id).localeCompare("errorAutor") == 0) || (toString(data.editorial_id).localeCompare("errorEditorial")==0)) {
      alert("Dilegencia todos los campos")      
    }else {
      const enviarDatos = async () => {
        const respuesta = await fetch(`${url_api}/libro/${data.libro_id}`, {
          method: "PUT",
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
            "Content-Type": "application/json",
          },
        })
  
        if (respuesta.status == 200) {
          alert('Libro actualizado Correctamente')
          fetchLibros()
  
  
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
        <div className='contenedor-edit-libro'>
          <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
            <table>
              <thead>
                <th>id</th>
                <th>Titulo</th>
                <th>Año de publicación</th>
                <th>Autor</th>
                <th>Genero</th>
                <th>Editorial</th>
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
                  <td><button onClick ={()=>fetchLibro(libro.libro_id)}>Editar</button></td>
                  </tr>)}

              </tbody>
            </table>

          </div>
          <div>
          <form id='form-nuevo-libro' onSubmit={onSubmit}>
        <h4 className='titulo-formulario' >Introduce la información para modificar el libro</h4>
            <div className='contenedor-form-nuevo'>
                <label htmlFor="libro_id">id</label>
                <input disabled type="text" {...register("libro_id", { required: true })} id="libro_id"/>
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
                <label htmlFor="estado">Estado</label>
                <input disabled type="text" {...register("estado", { required: true })} id="estado"/>

            </div>
            <div>
             <button className="boton-rojo" type="submit">Guardar</button>
            </div>            
        </form>
          </div>
        </div>        
        
        </>
    )

}

export default EditLibro