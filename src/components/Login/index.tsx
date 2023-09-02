import React, { useState } from 'react';
import { ClienteDTO } from 'models/cliente';
import authservice from 'services/authservice';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './styles.css';
interface LoginProps {
  onLogin: (cliente: ClienteDTO) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      // Chame a função de login do seu serviço de autenticação
      const response = await authservice.login(username, senha);

      // Se o login for bem-sucedido, chame a função onLogin com os dados do cliente
      onLogin(response);
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  };

  return (
    <div className='d-flex align-items-center py-4 h-100'>
      <main className='w-100 m-auto form-container'>
        <form>
          <div className='form-floating'>
            <InputText
              type="text"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-floating'>
            <Password
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <Button onClick={handleLogin} label="Login" />
        </form>
      </main>
    </div>
  );
};

export default Login;
