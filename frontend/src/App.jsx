import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Add from './components/Add/Add';
import Edit from './components/Edit/Edit';
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
        <Navbar/> {/* Navbar should be outside the Routes */}
        <Routes>
           <Route path='/' element={<Login />} />
           <Route element={<PrivateRoutes/>}>
          <Route path='/home' element={<Home />} />
          <Route path='/add' element={<Add />} />
          <Route path='/edit' element={<Edit />} />
          </Route>
        </Routes>

    </>
  );
}

export default App;
