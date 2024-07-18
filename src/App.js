// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './component/Layout/Layout';
import AuthForm from './component/Auth/AuthForm';
import HomePage from './component/Pages/HomePage';
import CompleteProfile from './component/Pages/CompleteProfile';
import AuthProvider from './component/context/AuthContext';
import Expenses from './component/Expenses/Expenses';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<AuthForm isSignup={true} />} />
          <Route path="/login" element={<AuthForm isSignup={false} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
