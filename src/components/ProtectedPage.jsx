import Logout from "./Logout";

const ProtectedPage = () => { 

  return (
    <div>
      <h1>Esta es una página protegida</h1>
      <p>Solo los usuarios autenticados pueden ver este contenido.</p>
      <Logout/>
    </div>
     // Botón de logout en el componente

     
 
  );
};

export default ProtectedPage;
