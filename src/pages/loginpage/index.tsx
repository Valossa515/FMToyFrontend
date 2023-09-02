import React, { useState } from 'react';
import { ClienteDTO } from 'models/cliente';
import Login from 'components/Login';
import authservice from 'services/authservice';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<ClienteDTO | null>(null);

  const handleLogin = (cliente: ClienteDTO) => {
    // Quando o login for bem-sucedido, atualize o estado do usuário
    setUser(cliente);
  };

  const handleLogout = () => {
    // Implemente a função de logout do seu serviço de autenticação
    authservice.logout();
    // Limpe o usuário do estado
    setUser(null);
  };

  return (
    <div >
      <h1>Página de Login</h1>
      {user ? (
        <div>
          <p>Bem-vindo, {user.nome}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
       <Link to="/auth/signup">Não tem uma conta? Crie uma aqui.</Link>
    </div>
  );
};

export default LoginPage;