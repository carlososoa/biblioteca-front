import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navegate = useNavigate()

  const url_api = import.meta.env.VITE_API_URI

  const handleLogout = async () => {
    try {
      const response = await fetch(`${url_api}/logout`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        alert('ha cerrado sesion')
        navegate('/login')

      } else {
        console.error('Error al hacer logout');
      }
    } catch (error) {
      console.error('Error al hacer logout:', error);
    }
  };

  return (
    <button className="boton-rojo" onClick={handleLogout}>Logout</button>

  );
};

export default Logout;
