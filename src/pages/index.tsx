import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from 'pages/loginpage';
import SignupPage from 'pages/signuppage';
import CategoriaPage from 'pages/categoriapage';
import ProdutoPage from 'pages/produtospage';
import MenuBar from 'components/MenuBar';
import CadastroPage from './ProfilePage';

const Pages: React.FC = () => {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/categorias" element={<CategoriaPage />} />
        <Route path="/produtos/:categoriasId" element={<ProdutoPage />} />
        <Route path="/clientes/perfil/:id" element={<CadastroPage />}>
        </Route>
      </Routes>
    </Router>
  );
};

export default Pages;
