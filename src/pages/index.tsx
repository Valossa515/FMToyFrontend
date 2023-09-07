// pages/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import LoginPage from 'pages/loginpage';
import SignupPage from 'pages/signuppage';
import CategoriaPage from 'pages/categoriapage';
import ProdutoPage from 'pages/produtospage';

const Pages: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/categorias" element={<CategoriaPage />} />
        <Route path="/produtos/:categoriasId" element={<ProdutoPage />} />
      </Routes>
    </Router>
  );
};

export default Pages;