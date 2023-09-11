import React, { useState } from 'react';
import { ClienteDTO } from 'models/cliente';
import Login from 'components/Login';
import authservice from 'services/authservice';

const LoginPage: React.FC = () => {
  const [user, setUser] = useState<ClienteDTO | null>(null);
  const handleLogin = (cliente: ClienteDTO) => {
    setUser(cliente);
  };                                                  

  const handleLogout = () => {
    // Implemente a função de logout do seu serviço de autenticação
    authservice.logout();
    // Limpe o usuário do estado
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Bem-vindo, {user.nome}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default LoginPage;
