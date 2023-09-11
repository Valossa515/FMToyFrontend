import React, { useState } from 'react';
import { ClienteDTO } from 'models/cliente';
import authservice from 'services/authservice';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

interface LoginProps {
  onLogin: (cliente: ClienteDTO) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Chame a função de login do seu serviço de autenticação
      const response = await authservice.login(username, senha);
      onLogin(response);
      navigate(`/clientes/perfil/${response.id}`);
      console.log('Redirecionando para pagina de perfil');
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  };

  return (
    <div>
        <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleLogin}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
          <Link to="/auth/signup">Não tem uma conta? Crie uma aqui.</Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;