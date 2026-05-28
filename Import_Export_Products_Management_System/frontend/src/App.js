import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate, Link} from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Imported from "./Imported";
import Exported from "./Exported";
import Report from './Report';

function App(){
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const handleLoginSuccess = (token, username) =>{
    setToken(token);
    setUsername(username);
  };

  const handleLogout = () =>{
    setToken('');
    setUsername('');
  };

  const isAuthenticated = !!token;

  const Navigate = () =>{
    const navigate = useNavigate();

    const performLogout = () =>{
      handleLogout();
      navigate('/');
    }
    return (
      <nav className="bg-blue-400 text-white px-8 py-2">
        <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rugoma Global Technologies</h1>

        <div className="space-x-6 font-medium">
          <Link to='/home' className="hover:text-yellow-300">Home Page</Link> &nbsp; &nbsp;
          <Link to='/imported' className="hover:text-yellow-300">Product Imported</Link>&nbsp; &nbsp;
          <Link to='/exported' className="hover:text-yellow-300">Product Exported</Link> &nbsp; &nbsp;
          <Link to="/report">Report</Link>
        </div>
        <div>
          <h2 className="mr-10">Welcome {username}!!</h2>
          <button onClick={performLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
        </div>
      </nav>
    );
  }
  return (
    <Router>
      {isAuthenticated && <Navigate />}

      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          isAuthenticated ? (
            <Home username={username} onLogout = {handleLogout} />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        } />
        <Route path="/imported" element={
          isAuthenticated ? (
            <Imported />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
        />
        <Route path="/exported" element={
          isAuthenticated ? (
            <Exported />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )
        } />
        <Route path="/report" element={
          isAuthenticated ? (
          <Report /> 
          ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
          )
        }
        />
      </Routes>
    </Router>
  );
}
export default App;