// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Layout from './component/Layout/Layout';
import AuthForm from './component/Auth/AuthForm';
import HomePage from './component/Pages/HomePage';

function App() {
    return (
        <>
            <div className="App">
                <h1>App Start</h1>
            </div>
            <Layout>
                <Routes>
                    <Route path="/" element={<AuthForm isSignup={true} />} />
                    <Route path="/login" element={<AuthForm isSignup={false} />} />
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </Layout>
        </>
    );
}

export default App;
