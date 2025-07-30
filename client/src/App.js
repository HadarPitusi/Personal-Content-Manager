//App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RegisterDetails from './pages/RegisterDetails';
import { getCurrentUser } from './utils/auth';
import Todos from './pages/Todos';
import Albums from './pages/Albums';
import Posts from './pages/Posts';
import Photos from './pages/Photos';
import Info from './pages/Info';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  },[]);

  useEffect(() => {
  }, [currentUser]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id/home" element={<Home />} />
        <Route path="/register/details" element={<RegisterDetails setCurrentUser={setCurrentUser}/>} />
        <Route path="/users/:id/todos" element={<Todos />} />
        <Route path="/users/:id/albums" element={<Albums />} />
        <Route path="/users/:id/albums/:id/photos" element={<Photos />} />
        <Route path="/users/:id/posts" element={<Posts />} />
        <Route path="/users/:id/info" element={<Info />} />
        {currentUser && <Route path="*" element={<Navigate to={`/users/${currentUser.id}/home`} replace />} />}

      </Routes>
    </Router>
  );
}

export default App;