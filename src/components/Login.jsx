import BarraInicio from "./BarraInicio"
import './Registrarse.css'
import { useForm } from 'react-hook-form';
import { useNavigate  } from 'react-router-dom';
import useAuth from './useAuth'
import ProtectedPage from './ProtectedPage'


function Login(){

    const url_api = import.meta.env.VITE_API_URI
    // eslint-disable-next-line no-unused-vars
    const { register, handleSubmit, setValue } = useForm() 
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data)=>{
        

        const enviarDatos = async () => {
            const respuesta = await fetch(`${url_api}/login`, {
              method: "POST",
              credentials: 'include',
              body: JSON.stringify(data), // data can be `string` or {object}!
              headers: {
                "Content-Type": "application/json",                
              },
      
      
            })
      
      
      
      
      
            if (respuesta.status == 200) {
              alert('Ha iniciado sesion correctamente')
              navigate("/protected");
      
      
            } else if (respuesta.status == 400) {
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

    let estaAutorizado = null

     estaAutorizado = useAuth()


     while (estaAutorizado == null) {
      return(
        <div>
          <h1>Cargando...</h1>
        </div>
      )}

    if (!estaAutorizado) {
      console.log(estaAutorizado);
      return(
        <>
            <BarraInicio/>
            <div className="contenedor-form">
                <div id="formulario">
                <h1>Iniciar Sesión</h1>
                <form  onSubmit={onSubmit}>
                    <div id="form-registro">
                        <div className="contenedor-pequeño">
                            <label htmlFor="username">Nombre de usuario</label>
                            <input type="text" {...register("username", { required: true })} id="username" />
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" {...register("password", { required: true })} id="password" />
                        </div>
                    </div>
                    <div>
                     <button className="boton-rojo" type="submit" >Iniciar sesión</button> 
                    </div>
                            
                    
                </form>                
                

                </div>

            </div>
        </>
            )    
      
    }
    return <ProtectedPage/>

    

}

export default Login