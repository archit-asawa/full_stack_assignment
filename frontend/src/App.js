import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateForm from './pages/CreateForm';
import ViewResponses from './pages/ViewResponses';
import PublicForm from './pages/PublicForm';

function App() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : null;
  });

  const isLoggedIn = !!auth?.token;

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  const setAuthAndPersist = (data) => {
    setAuth(data);
    localStorage.setItem('auth', JSON.stringify(data));
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuthAndPersist} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard auth={auth} /> : <Navigate to="/login" />} />
        <Route path="/create-form" element={isLoggedIn ? <CreateForm auth={auth} /> : <Navigate to="/login" />} />
        <Route path="/responses/:formId" element={isLoggedIn ? <ViewResponses auth={auth} /> : <Navigate to="/login" />} />
        <Route path="/form/:publicId" element={<PublicForm />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
