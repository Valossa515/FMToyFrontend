import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from 'pages/loginpage';
import SignupPage from 'pages/signuppage';
import CategoriaPage from 'pages/categoriapage';
import ProdutoPage from 'pages/produtospage';
import CadastroPage from './ProfilePage';
import MenuBar from 'components/MenuBar';
import ForgotPage from './forgotpage';
import { ToastContainer, toast } from 'react-toastify';

interface IComponentProps {
  // Defina as propriedades esperadas aqui
}
const PrivateRoute: React.FC<{ component: React.ComponentType<IComponentProps> }> = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('user');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      toast.error('Você precisa estar logado para acessar esta rota.');
      navigate('/');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <Component {...rest} />;
};



const Pages: React.FC = () => {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        {/* Rota "/" renderiza LoginPage sem MenuBar */}
        <Route path="/" element={<LoginPage />} />
        {/* Rota "/auth/signup" renderiza SignupPage sem MenuBar */}
        <Route path="/auth/signup" element={<SignupPage />} />
        {/* Todas as outras rotas estão envolvidas em ProtectedRoute */}
        <Route
          path="/auth/forgot"
          element={<ForgotPage />}
        />
        <Route
          path="/*"
          element={
            <>
              <MenuBar />
              <Routes>
                <Route path="/categorias" element={<PrivateRoute component={CategoriaPage} />} />
                <Route path="/produtos/:categoriasId" element={<PrivateRoute component={ProdutoPage} />} />
                <Route path="/clientes/perfil/:id" element={<PrivateRoute component={CadastroPage} />} />        
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default Pages;