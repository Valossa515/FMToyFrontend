import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import produtoservice from 'services/produtoservice';
import { ProdutoDTO } from 'models/produto';
import ProdutoCard from 'components/CardProdutos';

const ProdutoPage: React.FC = () => {
  const location = useLocation();
  const history = useNavigate();

  const params = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const page = parseInt(params.get('page') || '0', 10);
  const linesPerPage = parseInt(params.get('linesPerPage') || '24', 10);
  const orderBy = params.get('orderBy') || 'nome';
  const direction = params.get('direction') || 'ASC';
  const nome = params.get('nome') || '';
  const categorias = params.getAll('categorias')
    .filter(id => id !== '')
    .map(id => {
      const parsedId = parseInt(id, 10);
      return isNaN(parsedId) ? null : parsedId;
    })
    .filter(id => id !== null) as number[];

  const [produtos, setProdutos] = useState<ProdutoDTO[]>([]);
  const [prevQueryParams, setPrevQueryParams] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const queryParams = `${page}-${linesPerPage}-${orderBy}-${direction}-${nome}-${categorias.join('-')}`;
        // Verifica se os parâmetros da consulta mudaram
        if (queryParams !== prevQueryParams) {
          const novosProdutos = await produtoservice.searchProducts(
            nome,
            categorias,
            page,
            linesPerPage,
            orderBy,
            direction
          );
          setProdutos(novosProdutos);
          // Atualiza os parâmetros da consulta anterior
          setPrevQueryParams(queryParams);
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchData(); // Sempre busca os produtos quando a página é carregada

  }, [page, linesPerPage, orderBy, direction, nome, categorias, prevQueryParams]);

  // Função para navegar para uma página específica
  const goToPage = (pageNumber: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber.toString());
    history(`?${searchParams.toString()}`);
  };

  return (
    <div>
      <h1>Produtos:</h1>
      <div className="row">
        {produtos.map((produto) => (
          <div className="col-md-4" key={produto.id}>
            <ProdutoCard produto={produto} />
          </div>
        ))}
      </div>
      
      {/* Menu de navegação da página */}
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => goToPage(page - 1)}
            >
              Anterior
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => goToPage(page + 1)}
            >
              Próxima
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProdutoPage;
