import './Inicio.css'
import NavBar from './NavBar'
import { useParams } from 'react-router-dom';
import { useState } from 'react';




function NuevoPrestamo() {
    const {libro_id} = useParams()
    const url_api = import.meta.env.VITE_API_URI;
    const [user, setUser] = useState([])

    const fetchUser = async () => {
        let usuario = document.getElementById('usuario-a-buscar')
        try {
    
          const response = await fetch(`${url_api}/api/users/${usuario.value}`)
          const data = await response.json()

          if (data.length === 0) {
            alert('Usuario no encontrado')
            
          }else{
            setUser(data)
          }
    

        } catch (error) {
          console.log(error);
        }
    
      }









    return(
        <>
        <NavBar/>
        <div>
            <label htmlFor="usuario">Buscar Usuario</label>
            <input style={{border:'solid 1px'}} type="text" id='usuario-a-buscar' />
            <button style={{margin : "5px"} }  onClick={fetchUser} >Buscar</button>
            {user.map(usuario=> <p>{usuario.username}</p> )}

        </div>

        </>
    )


}

export default NuevoPrestamo