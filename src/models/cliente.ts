import { EnderecoDTO } from "models/endereco";
import { PedidoDTO } from "models/pedido";
import { Roles } from "models/roles";

export interface ClienteDTO {
    id: number;
    nome: string;
    email: string;
    cpfOuCnpj: string;
    senha: string;
    username: string;
    roles: Roles[];
    enderecos: EnderecoDTO[];
    telefones: string[];
    tipo: number;
    pedidos: PedidoDTO[];
  }