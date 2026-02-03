import { useState,useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes,Route,useNavigate,Navigate } from 'react-router-dom';
import './index.css' 
import { authService, isAuthenticated } from './services/api';
import Login from './components/auth/login';


function AppContent(){
 //attributes needed
  const[isLoggedIn, setIsLoggedIn] = useState(() =>{
    return isAuthenticated(); // check if the user logging in is authenticated so means has jwt token
    });

  const navigate =useNavigate();
  
  //handle error 401
  useEffect(() => {
    const handle401 = () => {
      authService.logout();
      setIsLoggedIn(false);
      navigate('/login');
    };
    window.addEventListener('unauthorized', handle401);
    return () => window.removeEventListener('unauthorized', handle401);
  }, [navigate]);

  return( 
    <div id="root">
        <Routes>
               <Route path="/" element={<Navigate to="/login" replace />} />
           <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        </Routes>

        {/* Global toastify containter */}
         <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </div>

  );

}

function App() {
 return(
  <BrowserRouter>
  <AppContent></AppContent>
  </BrowserRouter>
 )

  }
export default App
