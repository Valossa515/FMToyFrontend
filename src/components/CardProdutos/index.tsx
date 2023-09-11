import React from 'react';
import { ProdutoDTO } from 'models/produto';
import 'bootstrap/dist/css/bootstrap.min.css';
interface ProdutoCardProps {
    produto: ProdutoDTO;
}

const ProdutoCard: React.FC<ProdutoCardProps> = ({ produto }) => {
    return (
      <div className="flex-auto card mb-3">
        <div className="card-body">
          <h5 className="card-title">{produto.nome}</h5>
          <p className="card-text">Preço: {produto.preco}</p>
          <p className="card-text">Quantidade: {produto.quantidade}</p>
        </div>
      </div>
    );
  };
  
  export default ProdutoCard;