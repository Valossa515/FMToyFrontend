import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import produtoservice from 'services/produtoservice';
import { ProdutoDTO } from 'models/produto';

const ProdutoPage: React.FC = () => {
  const location = useLocation();

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
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const novosProdutos = await produtoservice.searchProducts(
          nome,
          categorias,
          currentPage,
          linesPerPage,
          orderBy,
          direction
        );

        if (isMounted) {
          if (novosProdutos && novosProdutos.length > 0) {
            setProdutos(novosProdutos);
          } else {
            console.error('Nenhum produto foi encontrado na resposta da API.');
            console.log('Resposta da API:', novosProdutos);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    // Verifique se a página atual mudou antes de fazer a consulta
    if (currentPage !== page || !hasInteracted) {
      setCurrentPage(page);
      setHasInteracted(true);
    } else {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [currentPage, page, linesPerPage, orderBy, direction, nome, categorias, hasInteracted]);

  const getNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Verifique se há uma próxima página com base no número atual de produtos
  const hasNextPage = produtos.length === linesPerPage;

  return (
    <div>
      <h1>Produtos da Categoria</h1>
      <ul>
        {Array.isArray(produtos) && produtos.length > 0 ? (
          produtos.map((produto) => (
            <li key={produto.id}>
              <p>Nome: {produto.nome}</p>
              <p>Preço: {produto.preco}</p>
              <p>Quantidade: {produto.quantidade}</p>
            </li>
          ))
        ) : (
          <li>Nenhum produto encontrado.</li>
        )}
      </ul>

      <div>
        {hasInteracted && hasNextPage && (
          <button onClick={getNextPage}>Próxima Página</button>
        )}
        {hasInteracted && currentPage > 0 && (
          <button onClick={getPreviousPage}>Página Anterior</button>
        )}
      </div>
    </div>
  );
};

export default ProdutoPage;
