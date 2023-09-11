import axios from 'axios';
import { BACKEND_URL } from 'utils/system';

const clienteservice = {

    getProfile: async (id: number) => {
        const response = await axios.get(`${BACKEND_URL}clientes/${id}`);
        return response.data;
    },
    updateProfile: async (id: number, formData: FormData) => {
        const response = await axios.put(`${BACKEND_URL}clientes/perfil/${id}`, formData);
        return response.data;
    },
}

export default clienteservice;  