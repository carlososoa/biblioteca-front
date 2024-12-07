
/* import './App.css' */
import Inicio from './components/Inicio'

import {
  Route,Routes
} from "react-router-dom";
import Registrarse from './components/Registrarse';
import Login from './components/Login';
import ProtectedPage from './components/ProtectedPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLibros from './components/AdminLibros';
import NuevoPrestamo from './components/NuevoPrestamo';
import AdminPrestamos from './components/AdminPrestamos';

function App() { 

  return (
    <>
      <section>
        
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/registrarse' element={<Registrarse/>} />    
          <Route path='/login' element={<Login/>} />
          <Route path="/protected" element={ <ProtectedRoute> <ProtectedPage/> </ProtectedRoute>   } />
          <Route path="/admin-libros" element={ <ProtectedRoute> <AdminLibros/> </ProtectedRoute>   } />
          <Route path="/nuevo-prestamo/:libro_id" element={ <ProtectedRoute> <NuevoPrestamo/> </ProtectedRoute>   } />
          <Route path="/admin-prestamo" element={ <ProtectedRoute> <AdminPrestamos/> </ProtectedRoute>   } />
          

   
        </Routes>
      </section>

      





    </>
  )
}

export default App