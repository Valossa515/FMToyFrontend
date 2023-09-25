import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from 'services/authservice';
const MenuBar = () => {
  const [profileLink, setProfileLink] = useState('');
  const history = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (id) {
      const profileUrl = `/clientes/perfil/${id}`;
      setProfileLink(profileUrl);
    }
  }, []);

  const handleLogout = () => {
    logout();  // Chama a função de logout do authService
    history('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Seu Logo</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Página Inicial</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">Categorias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/produtos">Produtos</Link>
            </li>
            {/* Adicione mais links para outras páginas aqui */}
            <li className="nav-item">
              <Link className="nav-link" to={profileLink}>Perfil</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
