import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

import CreateCustomer from "./pages/createc";
import Home from "./pages/home";
import Patient from "./pages/patient";
import Login from './pages/login'
import Register from './pages/register'
import PageNotFound from './pages/PageNotFound';
import GuestRoute from './utils/GuestRoute';

import axios from 'axios'
import { AuthContext } from './helpers/AuthContex'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import PrivateRoutes from './utils/PrivateRoute';
import FullscreenButton from './utils/Fullscreen';
import TrustmeLog from './asset/logo_auto.png'

function App() {
  const [authState, setAuthState] = useState({username: "", id:0 , status: false});
  const [isLoading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get('https://visa-test-5417272958c4.herokuapp.com/auth/validate', { headers:{
      accessToken: Cookies.get('accessToken'),
    },
  }).then((response)=>{
      if(response.data.error)
      {
         setAuthState({...authState, status: false});
      }
      else
      {
        setAuthState({username: response.data.username , id: response.data.id , status: true})
        
      }
    }).then(()=>{setLoading(false)})
    ;
  },[])

  const  logout = () =>{
    Cookies.remove("accessToken")
    setAuthState({username: "", id:0 , status: false})
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="nav">
          <img src={TrustmeLog} alt="Logo" className='navText img'/>
          <Link to="/" className='navText'>Home </Link>
          {!authState.status ? (
            <>
              <Link to="/login" className='navText'>login </Link>
              <Link to="/register" className='navText'>register </Link>
            </>
          ):(
            <>
            <div onClick={logout} className='navText_right'> logout</div>
            <div className='navText_right username'>{authState.username}</div>
            </>
          )}
          <FullscreenButton />
          </div>
          <Routes>
            <Route path="/login" element={<GuestRoute token={authState.status} />}>
                <Route index element={<Login />} />
              </Route>
              <Route path="/register" element={<GuestRoute token={authState.status} />}>
                <Route index element={<Register />} />
              </Route>

            {/* Place PrivateRoutes next */}
            <Route path="/" element={<PrivateRoutes token={authState.status} />}>
              <Route index element={<Home />} />
              <Route path="/createCustomer" element={<CreateCustomer />} />
              <Route path="/patient/:id" element={<Patient />} />
            </Route>
            <Route path="*" element={<PageNotFound />} exact />
          </Routes>
        </Router>
      </AuthContext.Provider>
      
    </div>
  )
}

export default App;
