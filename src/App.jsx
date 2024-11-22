
/* import './App.css' */
import Inicio from './components/Inicio'

import {
  Route,Routes
} from "react-router-dom";
import Registrarse from './components/Registrarse';
import Login from './components/Login';
import ProtectedPage from './components/ProtectedPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() { 

  return (
    <>
      <section>
        
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/registrarse' element={<Registrarse/>} />    
          <Route path='/login' element={<Login/>} />
          <Route path="/protected" element={ <ProtectedRoute> <ProtectedPage/> </ProtectedRoute>   } />
   
        </Routes>
      </section>

      





    </>
  )
}

export default App