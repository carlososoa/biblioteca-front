
import { useState, useEffect } from 'react';

const url_api = import.meta.env.VITE_API_URI

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${url_api}/protegida`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",                
          },
  
  
        })
        if (response.status == 200) {
          const data = await response.json();
          console.log(data.message);          
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};

export default useAuth;
