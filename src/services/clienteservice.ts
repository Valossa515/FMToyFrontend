import axios from 'axios';
import { ClienteDTO } from 'models/cliente';
import { BACKEND_URL } from 'utils/system';
import { authHeader } from './authheader';



const clienteservice = {
  getProfile: async (id: number) => {
    const response = await axios.get(`${BACKEND_URL}clientes/${id}`);
    return response.data;
  },
  updateProfileAndAddress: async (id: number, updatedCliente: ClienteDTO) => {
    try {
      const header = authHeader();
      if (!header) {
        throw new Error('Token não encontrado.');
      }
      const response = await axios.put(`${BACKEND_URL}clientes/perfil/${id}`, updatedCliente,
        {
          headers: {
            ...header,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  }

}

export default clienteservice;  