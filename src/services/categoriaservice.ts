import axios from 'axios';
import { BACKEND_URL } from 'utils/system';
import { CategoriaDTO } from 'models/categoria'; // Importe o modelo CategoriaDTO

export const getAllCategories = async (): Promise<CategoriaDTO[]> => {
  try {
    const response = await axios.get<CategoriaDTO[]>(`${BACKEND_URL}categorias`);
    return response.data;
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    throw error;
  }
};

export const getCategoryById = async (categoryId: number): Promise<CategoriaDTO> => {
  try {
    const response = await axios.get<CategoriaDTO>(`${BACKEND_URL}categorias/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter categoria com ID ${categoryId}:`, error);
    throw error;
  }
};
const categoriaservice = { getAllCategories, getCategoryById };

export default categoriaservice;
 