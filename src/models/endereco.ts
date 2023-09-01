import { ClienteDTO } from "models/cliente";
import { CidadeDTO } from "models/cidade";

export interface EnderecoDTO {
    id: number;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cep: string;
    cliente: ClienteDTO;
    cidade: CidadeDTO;
  }