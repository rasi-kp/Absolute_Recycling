import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'


import { Home, FormPage, Login, Password, AdmLogin, AdmMain, PageNotFound } from "./pages"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Password" element={<Password />} />
        <Route path="/home" element={<Home />} />
        <Route path="/FormPage" element={<FormPage />} />
        <Route path="/AdmLogin" element={<AdmLogin />} />
        <Route path="/AdmMain" element={<AdmMain />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
      </Routes>
   
  </BrowserRouter>
);