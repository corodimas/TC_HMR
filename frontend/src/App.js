import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'

import CCustomer from "./pages/createCustomer";
import Home from "./pages/home";
import Patient from "./pages/patient";

function App() {
  return <div className='App'>
    <Router>
      <Link to="/createCustomer">Create_Patient </Link>
      <Link to="/patient">Patient </Link>
      <Link to="/">Home </Link>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/createCustomer" element={<CCustomer/>} exact/>
          <Route path="/patient/:id" element={<Patient/>} exact />
      </Routes>
    </Router>
    </div>;
}

export default App;
