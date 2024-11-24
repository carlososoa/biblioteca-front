import './NuevoPrestamo.css'
import NavBar from './NavBar'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function NuevoPrestamo() {
    const {libro_id} = useParams()
    const url_api = import.meta.env.VITE_API_URI;
    const [users, setUsers] = useState([])
    const [usuarioPrestamo, setUsuarioPrestamo] = useState()
    const { register, handleSubmit, setValue } = useForm() 
    const { register:registerForm2, handleSubmit:handleSubmitForm2, setValue:setValueForm2 } = useForm() 

    const fetchUser = async () => {
        let usuario = document.getElementById('usuario-a-buscar')
        try {
    
          const response = await fetch(`${url_api}/api/user-by-username/${usuario.value}`)
          const data = await response.json()

          if (data.length === 0) {
            alert('Usuario no encontrado')
            
          }else{
            setUsers(data)
          }
    

        } catch (error) {
          console.log(error);
        }
    
      }

      const consultarUsuario = async (id) => {

        try {
    
          const response = await fetch(`${url_api}/api/users/${id}`)
          const data = await response.json()          
          setUsuarioPrestamo(data[0])
          try {
            console.log(data.username);
            setValue('user_id', data[0].user_id)
            setValue('username', data[0].username)
            setValue('direccion', data[0].direccion)
            setValue('telefono', data[0].telefono)
            setValue('email', data[0].email)              
          } catch (error) {
            console.log(error);
            
          }      
 
        } catch (error) {
          console.log(error);
        }
    
      }

      const onSubmit = handleSubmit((data) => {

        const enviarDatos = async () => {
          

          const respuesta = await fetch(`${url_api}/api/users/${data.user_id}`, {
            method: "PUT",
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
              "Content-Type": "application/json",
            },
          })
    
          if (respuesta.status == 200) {
            
            setValueForm2('user_id', usuarioPrestamo.user_id)
            console.log(libro_id);
            setValueForm2('libro_id', libro_id)  
            alert('Usuario actualizado Correctamente')   
    
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

    return(
        <>
        <NavBar/>
        <div>
            <label id='label-buscar' htmlFor="usuario">Buscar Usuario</label>
            <input style={{border:'solid 1px'}} type="text" id='usuario-a-buscar' />
            <button style={{margin : "5px"} }  onClick={fetchUser} >Buscar</button>
            <div id='contenedor-prestamo'>
                <div>
                <table id='tabla-usuarios' >
                <thead>
                    <th>Nombre de usuario</th>
                    <th>email</th>
                    <th>Acción</th>                    
                </thead>
                <tbody>
                {users.map(user => <tr key = {user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick ={()=>consultarUsuario(user.user_id)} >Seleccionar</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>

                </div>
                <div>
                <form id='form-actualizar-usuario' onSubmit={onSubmit}>
                    <h4 className='titulo-formulario' >Actualiza la información de contacto</h4>
                    <div className='contenedor-form-nuevo'>
                        <label htmlFor="user_id">id</label>
                        <input disabled type="text" id='user_id' {...register("user_id", { required: true })}/>
                        <label htmlFor="username">Usuario</label>
                        <input disabled type="text" id='username' {...register("username", { required: true })}/>
                        <label htmlFor="direccion">Dirección</label>
                        <input  type="text"  id="direccion"  {...register("direccion", { required: true })} />
                        <label htmlFor="telefono">Teléfono</label>
                        <input  type="text"  id="telefono" {...register("telefono", { required: true })}/>
                        <label htmlFor="email">email</label>
                        <input  type="text"  id="email" {...register("email", { required: true })}/>
                    </div>
                    <button className="boton-rojo" type="submit">Guardar</button>

                </form>

                </div>
                <div>
                    <form id='form-actualizar-usuario' action="">
                        <h4 className='titulo-formulario' >Prestar libro</h4>
                        <div className='contenedor-form-nuevo'>
                            <label htmlFor="username">Usuario</label>
                            <input disabled type="text"  id="username"{...registerForm2("user_id", { required: true })}/>
                            <label htmlFor="titulo">libro</label>
                            <input disabled  type="text"  id="titulo"{...registerForm2("libro_id", { required: true })}/>
                        </div>
                        <button className="boton-rojo" type="submit">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )


}

export default NuevoPrestamo