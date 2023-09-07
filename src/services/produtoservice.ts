import axios from 'axios';
import { ProdutoDTO } from 'models/produto';
import { BACKEND_URL } from 'utils/system';

export const getAllProdutos = async (): Promise<ProdutoDTO[]> => {
    try {
        const response = await axios.get<ProdutoDTO[]>(`${BACKEND_URL}/produtos`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        throw error;
    }
};

export const getProdutoById = async (produtoId: number): Promise<ProdutoDTO> => {
    try {
        const response = await axios.get<ProdutoDTO>(`${BACKEND_URL}/produtos/${produtoId}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao obter produto com ID ${produtoId}:`, error);
        throw error;
    }
};

export const createProduto = async (produto: ProdutoDTO): Promise<ProdutoDTO> => {
    try {
        const response = await axios.post<ProdutoDTO>(`${BACKEND_URL}/produtos`, produto);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
};

export const updateProduto = async (produtoId: number, produto: ProdutoDTO): Promise<ProdutoDTO> => {
    try {
        const response = await axios.put<ProdutoDTO>(`${BACKEND_URL}/produtos/${produtoId}`, produto);
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar produto com ID ${produtoId}:`, error);
        throw error;
    }
};

export const deleteProduto = async (produtoId: number): Promise<void> => {
    try {
        await axios.delete(`${BACKEND_URL}/produtos/${produtoId}`);
    } catch (error) {
        console.error(`Erro ao excluir produto com ID ${produtoId}:`, error);
        throw error;
    }
};

export const searchProducts = async (
    nome: string,
    categoriaIds: number[],
    page: number,
    linesPerPage: number,
    orderBy: string,
    direction: string
): Promise<ProdutoDTO[]> => {
    try {
        // Construa a URL diretamente com os parâmetros de busca
        const url = `${BACKEND_URL}produtos/pages?` +
            `nome=${encodeURIComponent(nome)}` + // Codifique o nome para evitar problemas com caracteres especiais
            `&categorias=${categoriaIds.join(',')}` +
            `&page=${page}` +
            `&linesPerPage=${linesPerPage}` +
            `&orderBy=${orderBy}` +
            `&direction=${direction}`;

        const response = await axios.get<ProdutoDTO[]>(url);

        if ('content' in response.data && Array.isArray(response.data['content'])) {
            return response.data['content'] as ProdutoDTO[];
        } else {
            console.error('Resposta da API não possui a propriedade "content" válida:', response.data);
            throw new Error('Resposta da API inválida');
        }

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
};

const produtoservice = {
    getAllProdutos, getProdutoById, createProduto, updateProduto,
    deleteProduto, searchProducts
};

export default produtoservice;






