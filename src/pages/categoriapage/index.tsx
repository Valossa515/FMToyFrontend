import React, { useEffect, useState } from 'react';
import { CategoriaDTO } from 'models/categoria';
import categoriaservice from 'services/categoriaservice';
import CategoriasMenu from 'components/Categorias';

const CategoriaPage: React.FC = () => {
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);

  useEffect(() => {
    // Quando a página carrega, busca as categorias
    async function fetchData() {
      try {
        const categorias = await categoriaservice.getAllCategories();
        setCategorias(categorias);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Categorias</h1>
      <CategoriasMenu categorias={categorias} />
    </div>
  );
};

export default CategoriaPage;
