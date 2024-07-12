import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './component/Layout/Layout';
import Authpage from './component/Pages/Authpage';
import AuthForm from './component/Auth/AuthForm';
import HomePage from './component/Pages/HomePage';
import CompleteProfile from './component/Pages/CompleteProfile';
import AuthProvider from './component/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <h1>App Start</h1>
      </div>
      <Layout>
        <Routes>
          <Route path="/" element={<AuthForm isSignup={true} />} />
          <Route path="/login" element={<AuthForm isSignup={false} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
