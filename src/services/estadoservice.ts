import axios from 'axios';
import { BACKEND_URL } from 'utils/system';
import authHeader from './autheader';

const estadoService = {
  getEstados: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}estados`, {
        headers: authHeader(), // Certifique-se de incluir o token JWT nas solicitações
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estados:', error);
      throw error;
    }
  },
  
  getCidadesPorEstado: async (estadoId: number) => {
    try {
      const response = await axios.get(`${BACKEND_URL}estados/${estadoId}/cidades`, {
        headers: authHeader(), // Certifique-se de incluir o token JWT nas solicitações
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar cidades:', error);
      throw error;
    }
  },
};

export default estadoService;
