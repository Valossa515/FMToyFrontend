import React from 'react';
import { CategoriaDTO } from 'models/categoria';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

interface CategoriasProps {
  categorias: CategoriaDTO[];
}

const CategoriasMenu: React.FC<CategoriasProps> = ({ categorias }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
          Seu Logo
        </a>
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
            {categorias.map((categoria) => (
              <li className="nav-item mx-2 my-2" key={categoria.id}>
                {/* Corrigir o caminho do Link */}
                <Link to={`/produtos/pages?page=0&linesPerPage=24&orderBy=nome&direction=ASC&nome=&categorias=${categoria.id}`}>
                  {categoria.nome}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CategoriasMenu;
